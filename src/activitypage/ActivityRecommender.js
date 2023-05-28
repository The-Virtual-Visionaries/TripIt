import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar.js";
import styles from "./ActivityRecommender.module.css";

const ActivityRecommender = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state.data);

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

  const handleSaveItinerary = () => {
    navigate("/history", { state: { data: data } });
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
    const [activityType, setActivityType] = useState("");
    const [activityDescription, setActivityDescription] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      onAdd({ activity_type: activityType, description: activityDescription });
      setActivityType("");
      setActivityDescription("");
      setShowForm(false);
    };

    return (
      <>
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <input
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
              placeholder="Activity Type"
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
          <button onClick={() => setShowForm(true)}>Add Activity</button>
        )}
      </>
    );
  };

  const EditableActivity = ({ activity, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [activityType, setActivityType] = useState(activity.activity_type);
    const [activityDescription, setActivityDescription] = useState(
      activity.description
    );

    const handleEdit = (event) => {
      event.preventDefault();
      onEdit({ activity_type: activityType, description: activityDescription });
      setIsEditing(false);
    };

    return isEditing ? (
      <form onSubmit={handleEdit}>
        <input
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
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
        <h3>{activity.activity_type}</h3>
        <p>{activity.description}</p>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {data.map((day, index) =>
          ["Morning", "Afternoon", "Night"].map((time) => (
            <Droppable
              droppableId={`${day.day}-${time}`}
              key={`${index}-${time}`}
            >
              {(provided) => (
                <div
                  className={styles.activityContainer}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className={styles.title}>
                    Day {day.day} - {time}
                  </h2>
                  {day[time].map((activity, activityIndex) => (
                    <Draggable
                      key={activity.activity_type}
                      draggableId={activity.activity_type}
                      index={activityIndex}
                    >
                      {(provided) => (
                        <div
                          className={styles.root}
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
                  <AddActivityButton
                    onAdd={(activity) => addActivity(day.day, time, activity)}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))
        )}
        <button className={styles.saveButton} onClick={handleSaveItinerary}>
          Save Itinerary
        </button>
      </DragDropContext>
    </>
  );
};

export default ActivityRecommender;
