import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Itinerary(props) {
  const {
    iid,
    name,
    destination,
    startDate,
    endDate,
    days,
    navigate,
    uid,
    change,
    changer,
  } = props;

  const handleEditItinerary = () => {
    navigate("/activity", {
      state: {
        data: "",
        itinerary: {
          iid: iid,
          destination: destination,
          startDate: startDate,
          endDate: endDate,
          days: days,
          name: name,
          uid: uid,
        },
      },
    });
  };

  const handleDeleteItinerary = () => {
    deleteDoc(doc(db, "itineraries", iid));
    changer(!change);
  };

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <p>Name: {name}</p>
      <p>Destination: {destination}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      <p>Days: {days}</p>
      <button onClick={handleEditItinerary}>Edit Itinerary</button>
      <button onClick={handleDeleteItinerary}>Delete Itinerary</button>
    </div>
  );
}
