import flask as flask
from chatgpt import chatgpt
from flask_cors import CORS


app = flask.Flask(__name__)

CORS(app)

CORS(app, origins="http://localhost:3000")


@app.route("/", methods=["GET", "POST"])
def home():
    return """
    <h1> Welcome to the backend of TripIt! </h1>

    <p>Please use the following endpoints to get your personalised recommendations:</p>
        /recommend 
        <ul>
            <li> country: country you are visiting </li>
            <li> num_days: number of days of your trip </li>
            <li> duration: duration of your trip </li>
            <li> preference_list: list of preferences for your trip </li>
            </li>
        </ul>
    """


@app.route("/recommend", methods=["GET"])
def recommend():
    country = flask.request.args.get("country")
    num_days = flask.request.args.get("num_days")
    start_date = flask.request.args.get("start_date")
    end_date = flask.request.args.get("end_date")
    preferences = flask.request.args.get("preferences")
    print(num_days)
    print(start_date)
    print(end_date)
    print(preferences)

    if country is None or num_days is None or start_date is None or end_date is None or preferences is None:
        return (
            "Please provide your trip details to get your personalised recommendations"
        )
    else:
        return chatgpt(country, num_days, start_date, end_date, preferences)


if __name__ == "__main__":
    app.run(debug=True)
