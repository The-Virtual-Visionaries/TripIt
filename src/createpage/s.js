const handleGenerateItinerary = (event) => {
  event.preventDefault();

  const itineraryDetails = {
    iid: "",
    destination: country.label,
    startDate: startDate,
    endDate: endDate,
    days: 3,
    name: "Itinerary Name",
    uid: auth.currentUser.uid,
  };
  /** 
        {
            country: {label: "Singapore", value: "SG"},
            startDate: "2023-05-25",
            endDate: "2023-05-25",
            preferences: ["preference1", "preference2"]
        }
        */
  // For Merrick: Perform ChatGPT API call here, and then replace sampleData with the actual data and parse in the data into /activity
  const sampleData = [
    {
      day: 1,
      Morning: [
        {
          activity_name: "Visit the Sydney Opera House",
          description:
            "Explore the iconic building and take in the stunning views of the harbor.",
        },
      ],
      Afternoon: [
        {
          activity_name: "Visit the Museum of Contemporary Art",
          description:
            "Explore the museum's collection of modern and contemporary art.",
        },
      ],
      Night: [
        {
          activity_name: "Take a stroll around Darling Harbour",
          description: "Enjoy the views of the harbor and the city skyline.",
        },
      ],
    },
    {
      day: 2,
      Morning: [
        {
          activity_name: "Visit the Queen Victoria Building",
          description:
            "Explore the historic building and its many shops and restaurants.",
        },
      ],
      Afternoon: [
        {
          activity_name: "Visit the Royal Botanic Gardens",
          description:
            "Enjoy the lush gardens and take in the stunning views of the harbor.",
        },
      ],
      Night: [
        {
          activity_name: "Take a ride on the Sydney Ferris Wheel",
          description: "Enjoy the views of the city from the top of the wheel.",
        },
      ],
    },
  ];

  navigate("/activity", {
    state: { data: sampleData, itinerary: itineraryDetails },
  });
};
