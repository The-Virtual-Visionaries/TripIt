import json
from collections import defaultdict


def parse_response(response):
    # response = {
    #     "choices": [
    #         {
    #             "finish_reason": "stop",
    #             "index": 0,
    #             "logprobs": "null",
    #             "text": "\nDay 1:\nActivity | Activity Type | Description\n1. Singapore National Museum | Museum | Explore the history and culture of Singapore.\n2. Gardens by the Bay | Park | Enjoy the beauty of nature and the Supertree Grove.\n3. Singapore River Cruise | Boat Tour | Take a leisurely cruise along the Singapore River.\n4. Singapore Flyer | Observation Wheel | Enjoy the stunning views of Singapore from the world's largest observation wheel.\n5. Chinatown | Shopping | Explore the bustling streets of Chinatown and shop for souvenirs.\n6. Clarke Quay | Nightlife | Enjoy the vibrant nightlife of Clarke Quay.",
    #         }
    #     ],
    #     "created": 1685157612,
    #     "id": "cmpl-7KelQpboLk0eHoe1D9kBZViMosACn",
    #     "model": "text-davinci-003",
    #     "object": "text_completion",
    #     "usage": {"completion_tokens": 133, "prompt_tokens": 82, "total_tokens": 215},
    # }
    # response = {
    #     "choices": [
    #         {
    #             "finish_reason": "stop",
    #             "index": 0,
    #             "logprobs": "null",
    #             "text": "\nDay 1:\nActivity | Activity Type | Description\n1. Sydney Opera House Tour | Museums | Take a guided tour of the iconic Sydney Opera House and learn about its history and architecture.\n2. Sydney Harbour Bridge Climb | Skyscrapers | Climb the iconic Sydney Harbour Bridge and enjoy the breathtaking views of the city.\n3. Taronga Zoo | Nature | Visit the Taronga Zoo and explore the diverse range of wildlife from Australia and around the world.\n4. Bondi Beach | Nature | Spend the day at Bondi Beach and enjoy the sun, sand and surf.\n5. The Rocks | Historical Architectures | Explore the historical buildings and cobblestone streets of The Rocks.\n6. Queen Victoria Building | Shopping | Visit the Queen Victoria Building and explore the many shops, restaurants and cafes.\n\nDay 2:\nActivity | Activity Type | Description\n1. Luna Park | Theme Parks | Enjoy the rides and attractions at Luna Park, Sydney's iconic amusement park.\n2. Sydney Tower Eye | Skyscrapers | Take in the 360-degree views of Sydney from the observation deck of the Sydney Tower Eye.\n3. Royal Botanic Gardens | Nature | Explore the lush gardens and tranquil lakes of the Royal Botanic Gardens.\n4. Sydney Fish Market | Shopping | Visit the Sydney Fish Market and sample the freshest seafood in the city.\n5. Sydney Harbour Cruise | Others | Take a cruise around Sydney Harbour and admire the city's stunning skyline.\n6. Sydney Olympic Park | Others | Visit the Sydney Olympic Park and explore the many attractions, including the Aquatic Centre and the Olympic Stadium.",
    #         }
    #     ],
    #     "created": 1685169721,
    #     "id": "cmpl-7KhujNXrUg8BqYo7Rkvd7Kj62ar37",
    #     "model": "text-davinci-003",
    #     "object": "text_completion",
    #     "usage": {"completion_tokens": 338, "prompt_tokens": 141, "total_tokens": 479},
    # }

    # response = {
    #     "choices": [
    #         {
    #             "finish_reason": "stop",
    #             "index": 0,
    #             "logprobs": "null",
    #             "text": "\nDay 1\nMorning\nSydney Opera House | Historical Architecture | Tour the iconic Sydney Opera House and explore its history and architecture.\nThe Rocks | Historical Architecture | Take a guided tour of The Rocks, the birthplace of modern Sydney.\nAfternoon\nSydney Harbour Bridge | Skyscraper | Climb the Sydney Harbour Bridge and enjoy the stunning views of the city.\nQueen Victoria Building | Shopping | Explore the Queen Victoria Building, a historic shopping centre with a range of stores and restaurants.\nNight\nSydney Tower Eye | Skyscraper | Take a trip to the top of the Sydney Tower Eye for a 360-degree view of the city.\nCockle Bay Wharf | Shopping | Visit Cockle Bay Wharf for a range of restaurants, bars, and shops.\nDay 2\nMorning\nAustralian National Maritime Museum | Museum | Explore the Australian National Maritime Museum and its collection of maritime artifacts.\nLuna Park | Carnival | Enjoy the rides and attractions at Luna Park, Sydney's iconic amusement park.\nAfternoon\nTaronga Zoo | Nature | Visit Taronga Zoo and explore its range of wildlife and exhibits.\nSydney Fish Market | Shopping | Visit the Sydney Fish Market and sample some of the freshest seafood in the city.\nNight\nSydney Observatory | Skyscraper | Take a guided tour of the Sydney Observatory and learn about the night sky.\nDarling Harbour | Shopping | Spend the evening at Darling Harbour, a vibrant waterfront precinct with plenty of restaurants and bars.",
    #         }
    #     ],
    #     "created": 1685249938,
    #     "id": "cmpl-7L2mYVaSyN4ysaK3ODw0BSHBKCF2O",
    #     "model": "text-davinci-003",
    #     "object": "text_completion",
    #     "usage": {"completion_tokens": 314, "prompt_tokens": 179, "total_tokens": 493},
    # }

    text = response["choices"][0]["text"]
    # print(text)
    return convert_to_itinerary(text)


# def convert_to_itinerary(activities):
#     # Split the text into sepearate lines
#     activities = activities.replace("\n", "", 1)
#     lines = activities.splitlines()
#     itinerary = {}

#     day = None
#     for line in lines:
#         line = line.strip()

#         if line.startswith("Day"):
#             day = line
#             itinerary[day] = []
#         elif line.startswith("Activity") or len(line) == 0:
#             continue
#         else:
#             activity, activity_type, description = line.split(" | ")
#             # Append the activity type and description to the list of activities for the current day
#             itinerary[day].append(
#                 {"activity_type": activity_type, "description": description}
#             )
#     # Convert into JSON object
#     return json.dumps(itinerary)


def convert_to_itinerary(activities):
    activities = activities.replace("\n", "", 1)
    print(activities)
    lines = activities.splitlines()
    json_data = []

    day_counter = 1
    current_day = None
    current_time_slot = None
    current_activities = defaultdict(list)

    for line in lines:
        if line.startswith('Day'):
            if current_day is not None and current_time_slot is not None:
                json_data.append({
                    "day": current_day,
                    "activities": current_activities
                })
                current_activities = defaultdict(list)
                day_counter += 1
            current_day = day_counter
        elif line in ['Morning', 'Afternoon', 'Night']:
            current_time_slot = line
        elif line.startswith("\n") or len(line) == 0:
            continue
        else:
            print(line.split(' | '))
            activity_name, activity_type, description = map(str.strip, line.split(' | '))
            current_activities[current_time_slot].append({
                "activity_name": activity_name,
                "activity_type": activity_type,
                "description": description
            })

    # Append the last day's activities
    json_data.append({
        "day": current_day,
        "activities": current_activities
    })

    json_output = json.dumps(json_data)
    print(json_output)
    return json_output