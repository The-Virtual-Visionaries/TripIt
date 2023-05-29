import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import React, { useState } from "react";
import { ClassNames } from "@emotion/react";
import "./Itinerary.css";

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
    <div className="itinerary">
    <div className="card card-custom">
        <div class="card-title card-title-custom">
          <div>{destination.toUpperCase()}</div>
        </div>
        <div class="card-subtitle">{name}</div>
        <div class="card-text">
          {startDate} - {endDate}
        </div>
        <div className="iti-buttons">
          <button className="iti-button" onClick={handleEditItinerary}>Edit</button>
          <button className="iti-button" onClick={handleDeleteItinerary}>Delete</button>
        </div>
    </div>
    </div>
  );
}

// buttons for edit and delete
