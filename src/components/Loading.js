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
      <img style={{width:"80px", height:"80px"}} src={require("../assets/flying-airplane.gif")} alt="airplane" />
      <img style={{width:"80px", height:"80px"}} src={require("../assets/Loading_icon.gif")} alt="loading ring" />
    </div>
  );
}

export default Loading;
