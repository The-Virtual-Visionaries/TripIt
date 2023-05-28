import React, { useState } from "react";
import Popup from "reactjs-popup";
import FullHistoryItem from "./FullHistoryItem";
import { Button } from "@mui/material";

export default function Itinerary(props) {
  const { iid, destination, startDate, endDate } = props;
  const popupRef = React.createRef();

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
