import json
from collections import defaultdict


def parse_response(response):
    # response = {
    #     "choices": [
    #         {
    #             "finish_reason": "stop",
    #             "index": 0,
    #             "logprobs": "null",
    #             "text": "\nDay 1\nMorning | Museum | Visit the Australian National Maritime Museum to explore the history of Australia's relationship with the sea.\nAfternoon | Shopping | Visit the Queen Victoria Building, a heritage-listed shopping center in the heart of Sydney.\nNight | Skyscrapers | Take a tour of the Sydney Tower Eye, the tallest building in Sydney, for a 360-degree view of the city.\n\nDay 2\nMorning | Nature | Take a walk in the Royal Botanic Garden, a 30-hectare garden located on the eastern fringe of the Sydney central business district.\nAfternoon | Theme Parks | Visit Luna Park, a historic amusement park located on the northern shore of Sydney Harbour.\nNight | Historical Architectures | Take a tour of the Sydney Opera House, a UNESCO World Heritage Site and one of the most iconic buildings in the world.",
    #         }
    #     ],
    #     "created": 1685265095,
    #     "id": "cmpl-7L6j1lQFaWLpFKsWPqBW7tmTKhHsm",
    #     "model": "text-davinci-003",
    #     "object": "text_completion",
    #     "usage": {"completion_tokens": 177, "prompt_tokens": 192, "total_tokens": 369},
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
    return convert_to_itinerary(text)

def convert_to_itinerary(text):
    # Split the text by '\n' character
    lines = text.split("\n")
    itinerary = []
    current_day = None

    for line in lines:
        # Ignore empty lines
        if not line.strip():
            continue

        if "Day" in line:
            if current_day is not None:
                itinerary.append(current_day)
            day_num = int(line.split(" ")[1])
            current_day = {"day": day_num}
        else:
            time_of_day, activity_type, description = line.split(" | ")
            if time_of_day not in current_day:
                current_day[time_of_day] = []
            current_day[time_of_day].append(
                {"activity_type": activity_type, "description": description}
            )

    # Append the last day to the itinerary
    if current_day is not None:
        itinerary.append(current_day)

    # Convert the list to JSON
    return json.dumps(itinerary, indent=2)