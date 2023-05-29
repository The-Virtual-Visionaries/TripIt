import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar.js";
import { setDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import {
  doc,
  collection,
  query,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import "./ActivityRecommender.css";
import * as dateFns from "date-fns";
import Loading from "../components/Loading.js";

const ActivityRecommender = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state.data);
  const [itinerary, setItinerary] = useState(location.state.itinerary);
  // can generalise gpt route to pass in loaded as true - location.state.loaded == true
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (itinerary.iid !== "") {
      getInitialActivities();
    } else {
      setLoaded(true);
    }
  }, []);

  const getActualDate = (startDate, dayNumber) => {
    let actualDate = new Date(startDate);
    actualDate.setDate(actualDate.getDate() + dayNumber - 1);
    return dateFns.format(actualDate, "dd MMM yyyy");
  };

  // firestore route, get all stored activities for this itinerary
  const getInitialActivities = () => {
    const list = [];
    const activitiesQuery = query(
      collection(db, "itineraries", itinerary.iid, "activities")
    );
    try {
      getDocs(activitiesQuery).then((snapshot) => {
        snapshot.forEach((activity) => {
          list.push({
            day: activity.data().day,
            timing: activity.data().timing,
            description: activity.data().description,
            activity_name: activity.data().activity_name,
          });
        });
        setData(firestoreToJson(list));
        setLoaded(true);
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSaveItinerary = () => {
    // field validation
    // ...
    if (itinerary.iid === "") {
      // create new itinerary since fresh itinerary from gpt prompts
      handleCreateAndUpdateItinerary();
    } else {
      // clear out activities of itinerary and update with new activities
      handleClearAndUpdateItinerary();
    }
    navigate("/itineraries");
  };

  const handleCreateAndUpdateItinerary = () => {
    if (
      itinerary.destination === "" ||
      itinerary.startDate === "" ||
      itinerary.endDate === "" ||
      itinerary.days === "" ||
      itinerary.name === "" ||
      itinerary.uid === ""
    ) {
      console.log("Missing fields.");
    } else {
      const docRef = doc(collection(db, "itineraries"));
      setItinerary({ ...itinerary, iid: docRef.id });
      setDoc(docRef, {
        destination: itinerary.destination,
        startDate: itinerary.startDate,
        endDate: itinerary.endDate,
        days: itinerary.days,
        name: itinerary.name,
        uid: itinerary.uid,
      })
        .then(() => {
          // create new empty activities collection to itinerary doc
          const colRef = collection(db, "itineraries", docRef.id, "activities");
          handleUpdatingItinerary(colRef, jsonToFirestore(data));
        })
        .catch((error) => console.log(error.message));
    }
  };

  const handleClearAndUpdateItinerary = () => {
    // delete all activities of itinerary based on iid
    const colRef = collection(db, "itineraries", itinerary.iid, "activities");
    const activitiesQuery = query(colRef);
    try {
      getDocs(activitiesQuery)
        .then((snapshot) => {
          snapshot.forEach((activity) => {
            deleteDoc(
              doc(db, "itineraries", itinerary.iid, "activities", activity.id)
            );
          });
        })
        .then(() => {
          handleUpdatingItinerary(colRef, jsonToFirestore(data));
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleUpdatingItinerary = (colRef, activities) => {
    // update activities of itinerary based on colRef
    console.log(colRef);
    for (let i = 0; i < activities.length; i++) {
      addDoc(colRef, {
        day: activities[i].day,
        timing: activities[i].timing,
        description: activities[i].description,
        activity_name: activities[i].activity_name,
      })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => console.log(error.message));
    }
  };

  // convert firestore array data to json format
  const firestoreToJson = (list) => {
    const jsonArray = [];
    for (let i = 1; i < itinerary.days + 1; i++) {
      jsonArray.push({
        day: i,
        Morning: [],
        Afternoon: [],
        Night: [],
      });
    }
    for (let i = 0; i < list.length; i++) {
      const day = list[i].day;
      const timing = list[i].timing;
      const activity = {
        description: list[i].description,
        activity_name: list[i].activity_name,
      };
      if (timing === "Morning") {
        jsonArray[day - 1].Morning.push(activity);
      } else if (timing === "Afternoon") {
        jsonArray[day - 1].Afternoon.push(activity);
      } else if (timing === "Night") {
        jsonArray[day - 1].Night.push(activity);
      }
    }
    return jsonArray;
  };

  // convert json format to firestore array data
  const jsonToFirestore = (json) => {
    const firestoreArray = [];
    for (let i = 0; i < json.length; i++) {
      const day = json[i].day;
      const morning = json[i].Morning;
      const afternoon = json[i].Afternoon;
      const night = json[i].Night;
      for (let j = 0; j < morning.length; j++) {
        const activity = {
          day: day,
          timing: "Morning",
          description: morning[j].description,
          activity_name: morning[j].activity_name,
        };
        firestoreArray.push(activity);
      }
      for (let j = 0; j < afternoon.length; j++) {
        const activity = {
          day: day,
          timing: "Afternoon",
          description: afternoon[j].description,
          activity_name: afternoon[j].activity_name,
        };
        firestoreArray.push(activity);
      }
      for (let j = 0; j < night.length; j++) {
        const activity = {
          day: day,
          timing: "Night",
          description: night[j].description,
          activity_name: night[j].activity_name,
        };
        firestoreArray.push(activity);
      }
    }
    return firestoreArray;
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const [sourceDay, sourceTime] = result.source.droppableId.split("-");
    const [destDay, destTime] = result.destination.droppableId.split("-");

    const sourceDayData = data.find((day) => day.day.toString() === sourceDay);
    const destDayData = data.find((day) => day.day.toString() === destDay);

    const [removed] = sourceDayData[sourceTime].splice(result.source.index, 1);
    destDayData[destTime].splice(result.destination.index, 0, removed);

    setData([...data]);
  };

  const deleteActivity = (dayId, time, activityIndex) => {
    const day = data.find((day) => day.day === dayId);
    day[time].splice(activityIndex, 1);
    setData([...data]);
  };

  const addActivity = (dayId, time, activity) => {
    const day = data.find((day) => day.day === dayId);
    day[time].push(activity);
    setData([...data]);
  };

  const editActivity = (dayId, time, activityIndex, updatedActivity) => {
    const day = data.find((day) => day.day === dayId);
    day[time][activityIndex] = updatedActivity;
    setData([...data]);
  };

  const AddActivityButton = ({ onAdd }) => {
    const [showForm, setShowForm] = useState(false);
    const [activityName, setActivityName] = useState("");
    const [activityDescription, setActivityDescription] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      onAdd({ activity_name: activityName, description: activityDescription });
      setActivityName("");
      setActivityDescription("");
      setShowForm(false);
    };

    return (
      <>
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <input
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="Activity Name"
            />
            <input
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              placeholder="Activity Description"
            />
            <button type="submit">Add Activity</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </form>
        ) : (
          <button
            style={{
              borderRadius: "40px",
              border: "black",
              backgroundColor: "transparent",
              fontSize: "4vw",
            }}
            onClick={() => setShowForm(true)}
          >
            +
          </button>
        )}
      </>
    );
  };

  const EditableActivity = ({ activity, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [activityName, setActivityName] = useState(activity.activity_name);
    const [activityDescription, setActivityDescription] = useState(
      activity.description
    );

    const handleEdit = (event) => {
      event.preventDefault();
      onEdit({ activity_name: activityName, description: activityDescription });
      setIsEditing(false);
    };

    return isEditing ? (
      <form onSubmit={handleEdit}>
        <input
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
        <input
          value={activityDescription}
          onChange={(e) => setActivityDescription(e.target.value)}
        />
        <button type="submit">Confirm</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </form>
    ) : (
      <div>
        <h3>{activity.activity_name}</h3>
        <p>{activity.description}</p>
        <button
          style={{
            backgroundColor: "#559AFF",
            borderRadius: "10px",
            marginBottom: "6vh",
            color: "white",
            paddingRight: "20px",
            paddingLeft: "20px",
            border: "none",
            margin: "0.5vw",
          }}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          style={{
            backgroundColor: "#559AFF",
            borderRadius: "10px",
            marginBottom: "6vh",
            color: "white",
            paddingRight: "20px",
            paddingLeft: "20px",
            border: "none",
            margin: "0.5vw",
          }}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    );
  };
  return (
    <>
      <Navbar />
      {loaded === false && <Loading />}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {loaded === true &&
          data.map((day, index) =>
            ["Morning", "Afternoon", "Night"].map((time) => (
              <Droppable
                droppableId={`${day.day}-${time}`}
                key={`${index}-${time}`}
              >
                {(provided) => (
                  <div
                    className="activityContainer"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="activity-header">
                      <div className="day">
                        {getActualDate(itinerary.startDate, day.day)} - {time}
                      </div>

                      <div className="add-activity-btn">
                        <AddActivityButton
                          onAdd={(activity) =>
                            addActivity(day.day, time, activity)
                          }
                        />
                      </div>
                    </div>
                    <div className="activity-info">
                      {day[time].map((activity, activityIndex) => (
                        <Draggable
                          key={activity.activity_name}
                          draggableId={activity.activity_name}
                          index={activityIndex}
                        >
                          {(provided) => (
                            <div
                              className="root"
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <EditableActivity
                                activity={activity}
                                onDelete={() =>
                                  deleteActivity(day.day, time, activityIndex)
                                }
                                onEdit={(updatedActivity) =>
                                  editActivity(
                                    day.day,
                                    time,
                                    activityIndex,
                                    updatedActivity
                                  )
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))
          )}
        <div className="save">
          <button className="saveButton" onClick={handleSaveItinerary}>
            Save Itinerary
          </button>
        </div>
      </DragDropContext>
    </>
  );
};

export default ActivityRecommender;
