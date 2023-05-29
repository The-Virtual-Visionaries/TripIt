import React, { useState } from "react";
import FullHistoryItem from "./FullHistoryItem";
import { ClassNames } from "@emotion/react";
import './Itinerary.css';

export default function Itinerary(props) {
  const { iid, name, destination, startDate, endDate } = props;

  return (
    <div className="card card-custom" style={{width:"18rem"}}>
    <div class="card-body card-body-custom">
      <div class="card-title card-title-custom">
        <div>{name}</div>
      </div>
      <div class="card-subtitle mb-2 text-body-secondary">{destination}</div>
      <div class="card-text">{startDate} - {endDate}</div>
    </div>
  </div>
  );
}

{/*<div style={{ border: "1px solid black", padding: "10px" }}>
      <h1>Itinerary id: {iid}</h1>
      <p>Name: {name}</p>
      <p>Destination: {destination}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
</div>*/}
