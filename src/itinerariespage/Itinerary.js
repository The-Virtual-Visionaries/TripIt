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
    <div className="card card-custom" style={{ width: "18rem" }}>
      <div class="card-body card-body-custom">
        <div class="card-title card-title-custom">
          <div>{name}</div>
        </div>
        <div class="card-subtitle mb-2 text-body-secondary">{destination}</div>
        <div class="card-text">
          {startDate} - {endDate}
        </div>
      </div>
    </div>
  );
}

// buttons for edit and delete
// <button onClick={handleEditItinerary}>Edit Itinerary</button>
// <button onClick={handleDeleteItinerary}>Delete Itinerary</button>
