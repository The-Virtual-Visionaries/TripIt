import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.js";
import { auth, db } from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";
import Itinerary from "./Itinerary.js";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Itineraries() {
  const [itineraries, setItineraries] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [uid, setUid] = useState("");
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);

  useEffect(() => {
    console.log("1");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        getItineraries(uid);
      } else {
        console.log("user is not signed in");
      }
    });
    return () => unsubscribe();
  }, [reload]);

  // get itinerary list from db, based on user id
  const getItineraries = (uid) => {
    const list = [];
    const itineraryQuery = query(
      collection(db, "itineraries"),
      where("uid", "==", uid)
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
            days: itinerary.data().days,
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
            days={item.days}
            navigate={navigate}
            uid={uid}
            change={reload}
            changer={setReload}
          />
        ))}
    </div>
  );
}
