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
                          <div>
                            <h3>{activity.activity_type}</h3>
                            <p>{activity.description}</p>
                            <button
                              className={styles.deleteButton}
                              onClick={() =>
                                deleteActivity(day.day, time, activityIndex)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
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
