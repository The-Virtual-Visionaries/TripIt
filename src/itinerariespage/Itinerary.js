import React, { useState } from "react";
import FullHistoryItem from "./FullHistoryItem";

export default function Itinerary(props) {
  const { iid, destination, startDate, endDate } = props;

  return (
    <div style={{ border: "1px solid black", padding: "10px" }}>
      <h1>Itinerary id: {iid}</h1>
      <p>Destination: {destination}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      {/* <Button variant="contained" color="primary" onClick={}> */}
    </div>
  );
}
