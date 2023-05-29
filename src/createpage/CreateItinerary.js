import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./CreateItinerary.css";
import Navbar from "../Navbar";
import { auth } from "../firebase";
// import axios from "axios";

function CreateItinerary() {
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preferences, setPreferences] = useState([""]);
  const navigate = useNavigate();
  const options = countryList().getData();

  const handlePreferenceChange = (index, event) => {
    const values = [...preferences];
    values[index] = event.target.value;
    setPreferences(values);
  };

  const handleAddPreference = () => {
    setPreferences([...preferences, ""]);
  };

  const handleCountryChange = (value) => {
    setCountry(value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleGenerateItinerary = (event) => {
    event.preventDefault();

    let start = new Date(startDate);
    let end = new Date(endDate);
    let diff = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    console.log(start, end, diff);

    const itineraryDetails = {
      iid: "",
      destination: country.label,
      startDate: startDate,
      endDate: endDate,
      days: diff,
      name: "Itinerary Name",
      uid: auth.currentUser.uid,
    };

    const params = {
      country: country.label,
      num_days: diff,
      start_date: startDate,
      end_date: endDate,
      preferences: preferences.toString(),
    };
    console.log(params);

    // let recommended_activities = axios.get('https://virtual-visionaries.herokuapp.com/recommend', { params:params })
    //     .then(response => {
    //     console.log(response.data);
    // })
    /** 
            {
                country: {label: "Singapore", value: "SG"},
                startDate: "2023-05-25",
                endDate: "2023-05-25",
                preferences: ["preference1", "preference2"]
            }
            */
    // For Merrick: Perform ChatGPT API call here, and then replace sampleData with the actual data and parse in the data into /activity
    const recommended_activities = [
      {
        day: 1,
        Morning: [
          {
            activity_name: "Museum",
            description:
              "Visit the Australian National Maritime Museum to explore the history of Australia's relationship with the sea.",
          },
        ],
        Afternoon: [
          {
            activity_name: "Shopping",
            description:
              "Visit the Queen Victoria Building, a heritage-listed shopping center in the heart of Sydney.",
          },
        ],
        Night: [
          {
            activity_name: "Skyscrapers",
            description:
              "Take a tour of the Sydney Tower Eye, the tallest building in Sydney, for a 360-degree view of the city.",
          },
        ],
      },
      {
        day: 2,
        Morning: [
          {
            activity_name: "Nature",
            description:
              "Take a walk in the Royal Botanic Garden, a 30-hectare garden with over 7,500 species of plants.",
          },
        ],
        Afternoon: [
          {
            activity_name: "Theme Parks",
            description:
              "Visit Luna Park, a historic amusement park with rides, games, and carnival attractions.",
          },
        ],
        Night: [
          {
            activity_name: "Historical Architectures",
            description:
              "Take a tour of the Sydney Opera House, a UNESCO World Heritage Site and one of the most iconic buildings in the world.",
          },
        ],
      },
    ];

    navigate("/activity", {
      state: { data: recommended_activities, itinerary: itineraryDetails },
    });
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="background-container">
          <div className="content">
            <div className="title">Where are you travelling to?</div>
            <Select
              options={options}
              value={country}
              onChange={handleCountryChange}
            />
            <div className="select-dates">Select Dates of Trip:</div>
            <div className="date-range-picker">
              <div className="date-input">
                <label>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </div>
              <div className="date-input">
                <label>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="preferences">
          <div className="pref-title">What are your travel preferences</div>
          <div className="preference-inputs">
            <div className="preference-input">
              {preferences.map((preference, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={preference}
                    placeholder="your preferences..."
                    className="pref-button"
                    onChange={(event) => handlePreferenceChange(index, event)}
                  />

                </div>
              ))}
            </div>
            <button onClick={handleAddPreference} className="addpref-btn">
              Add Preference
            </button>
          </div>
        </div>
        <div className="generate-button">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleGenerateItinerary}
          >
            Generate Itinerary
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateItinerary;
