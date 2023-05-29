import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.js";
import { auth, db } from "../firebase.js";
import { doc, collection, query, where, getDocs } from "firebase/firestore";
import Itinerary from "./Itinerary.js";

export default function Itineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const user = auth.currentUser;
  if (user != null) {
    const uid = user.uid;
    console.log(uid);
  } else {
    console.log("user is null");
  }

  useEffect(() => {
    getItineraries();
  }, []);

  // get itinerary list from db, based on user id and finalised boolean
  const getItineraries = () => {
    const list = [];
    const itineraryQuery = query(
      collection(db, "itineraries"),
      where("uid", "==", "12345")
    );
    try {
      // const itineraryQuerySnapshot = getDocs(itineraryQuery);
      getDocs(itineraryQuery).then((snapshot) => {
        snapshot.forEach((itinerary) => {
          list.push({
            iid: itinerary.id,
            name: itinerary.data().name,
            destination: itinerary.data().destination,
            startDate: itinerary.data().startDate,
            endDate: itinerary.data().endDate,
          });
        });
        setItineraries(list);
        setLoaded(true);
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <Navbar />
      {itineraries.length === 0 && loaded === true && (
        <div style={{textAlign:'center', margin:'45vh'}}>No itineraries finalised yet.</div>
      )}
      {itineraries.length > 0 &&
        itineraries.map((item) => (
          <Itinerary
            key={item.iid}
            iid={item.iid}
            name={item.name}
            destination={item.destination}
            startDate={item.startDate}
            endDate={item.endDate}
          />
        ))}
    </div>
  );
}
