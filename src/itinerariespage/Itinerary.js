import React, { useState } from "react";
import FullHistoryItem from "./FullHistoryItem";

export default function Itinerary(props) {
  const { iid, name, destination, startDate, endDate } = props;

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h1>Itinerary id: {iid}</h1>
      <p>Name: {name}</p>
      <p>Destination: {destination}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      {/* <Button variant="contained" color="primary" onClick={}> */}
    </div>
  );
}
