import React from "react";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "20%",
      }}
    >
      <img src="../assets/flying-airplane.gif" alt="airplane" />
      <img src="../assets/Loading_icon.gif" alt="loading ring" />
    </div>
  );
}

export default Loading;
