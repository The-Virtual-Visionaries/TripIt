import { collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { getDocs, query } from "firebase/firestore";

export default function FullHistoryItem(props) {
  const { iid, destination, startDate, endDate } = props;
  const [activities, setActivities] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = () => {
    const list = [];
    const activityQuery = query(
      collection(db, "itineraries", iid, "activities")
    );
    try {
      getDocs(activityQuery).then((snapshot) => {
        snapshot.forEach((activity) => {
          list.push({
            aid: activity.id,
            name: activity.data().name,
            description: activity.data().description,
            location: activity.data().location,
            startTime: activity.data().startTime,
            endTime: activity.data().endTime,
          });
        });
        console.log(list);
        setActivities(list);
        setLoaded(true);
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <h1>Itinerary id: {iid}</h1>
      <p>Destination: {destination}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      {activities.length === 0 && loaded === true && (
        <span>No activities added yet.</span>
      )}
    </div>
  );
}
