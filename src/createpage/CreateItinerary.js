import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import "./CreateItinerary.css";
import Navbar from "../Navbar";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import TemporaryLoader from "../components/TemporaryLoader";

function CreateItinerary() {
    const [country, setCountry] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [preferences, setPreferences] = useState([""]);
    const [loaded, setLoaded] = useState(false);
    const [itineraryName, setItineraryName] = useState("");
    const navigate = useNavigate();
    const options = countryList().getData();
    const [errors, setErrors] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in");
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

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

    const handleItineraryNameChange = (event) => {
        setItineraryName(event.target.value);
    };

    const validateInputs = () => {
        let errors = [];
        if (!country || !country.label) {
          errors.push("Country should not be blank");
        }
    
        if (!startDate || !endDate) {
          errors.push("Start and end dates cannot be blank");
        }
    
        let start = new Date(startDate);
        let end = new Date(endDate);
        let diff = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    
        if (isNaN(diff)) {
          errors.push("Invalid start or end date");
        } else if (diff < 0) {
          errors.push("Start date must be earlier than the end date");
        } else if (diff > 10) {
          errors.push("Start and end dates cannot be more than 10 days apart");
        }
    
        for (let preference of preferences) {
          if (preference.length > 20) {
            errors.push("Preferences should not be more than 20 characters");
          }
        }
    
        if (!itineraryName.trim()) {
          errors.push("Itinerary name should not be empty");
        }
    
        if (itineraryName.length > 30) {
          errors.push("Itinerary name should not be longer than 30 characters");
        }
    
        return errors;
      };

    const handleGenerateItinerary = (event) => {
        event.preventDefault();

        const errors = validateInputs();

        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

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
        setLoaded(true);
        console.log(params);

        axios.get('https://virtual-visionaries.herokuapp.com/recommend', { params: params })
            .then(response => {
                navigate("/activity", {
                    state: { data: response.data, itinerary: itineraryDetails },
                });
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
        /** 
                {
                    country: {label: "Singapore", value: "SG"},
                    startDate: "2023-05-25",
                    endDate: "2023-05-25",
                    preferences: ["preference1", "preference2"]
                }
                */
        // For Merrick: Perform ChatGPT API call here, and then replace sampleData with the actual data and parse in the data into /activity
        // recommended_activities = [
        //     {
        //         day: 1,
        //         Morning: [
        //             {
        //                 activity_name: "Museum",
        //                 description:
        //                     "Visit the Australian National Maritime Museum to explore the history of Australia's relationship with the sea.",
        //             },
        //         ],
        //         Afternoon: [
        //             {
        //                 activity_name: "Shopping",
        //                 description:
        //                     "Visit the Queen Victoria Building, a heritage-listed shopping center in the heart of Sydney.",
        //             },
        //         ],
        //         Night: [
        //             {
        //                 activity_name: "Skyscrapers",
        //                 description:
        //                     "Take a tour of the Sydney Tower Eye, the tallest building in Sydney, for a 360-degree view of the city.",
        //             },
        //         ],
        //     },
        //     {
        //         day: 2,
        //         Morning: [
        //             {
        //                 activity_name: "Nature",
        //                 description:
        //                     "Take a walk in the Royal Botanic Garden, a 30-hectare garden with over 7,500 species of plants.",
        //             },
        //         ],
        //         Afternoon: [
        //             {
        //                 activity_name: "Theme Parks",
        //                 description:
        //                     "Visit Luna Park, a historic amusement park with rides, games, and carnival attractions.",
        //             },
        //         ],
        //         Night: [
        //             {
        //                 activity_name: "Historical Architectures",
        //                 description:
        //                     "Take a tour of the Sydney Opera House, a UNESCO World Heritage Site and one of the most iconic buildings in the world.",
        //             },
        //         ],
        //     },
        // ];
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
                <div className="naming">
                    <div>What's your itinerary name?</div>
                    <input
                        class="form-control small-input"
                        type="text"
                        placeholder="name..."
                        aria-label="default input example"
                        value={itineraryName}
                        onChange={handleItineraryNameChange}
                    />
                </div>
                {errors.length > 0 && (
                    <div className="error-container">
                        {errors.map((error, index) => (
                            <div key={index} className="error-message">
                                {error}
                            </div>
                        ))}
                    </div>
                )}
                {loaded === true
                    && <TemporaryLoader />}
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