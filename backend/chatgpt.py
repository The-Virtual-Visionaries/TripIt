import os
import openai
from dotenv import dotenv_values
import json
from formatter import parse_response, convert_to_itinerary

# load the API KEY
openai.api_key = os.environ.get("OPENAI_API_KEY")


token_estimator = {days: days * 300 for days in range(1, 10)}

# Configure the parameters from the frontend
def chatgpt(country, num_days, start_date, end_date, preferences):

    prompt = """
    List activities for users to do based on 
    1. Country: {country}
    2. Date: {start_date} to {end_date} ({num_days} day)
    3. Preference: {preferences} but add other activities too
    4. Activities should fall under: Museums, Shopping, Skyscrappers, Nature, Theme Parks, Historical Architectures, Others
    5. Give me multiple options for me to choose from
    7. Don't have a extra line between the Days

    Follow this format for me to parse later
    Day 1
    Morning
    Activity | Activity Type | Description
    Afternoon
    Activity | Activity Type | Description
    Night
    Activity | Activity Type | Description

    Keep the description concise and only include the itinerary details. Ensure the total response has no cut off and each day has some activities.
    """.format(
        country=country,
        num_days=num_days, 
        start_date=start_date, 
        end_date=end_date,
        preferences=preferences)

    response = openai.Completion.create(model="text-davinci-003", prompt=prompt, temperature=0, max_tokens=token_estimator[int(num_days)])
    return parse_response(response)