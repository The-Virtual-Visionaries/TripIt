import React from "react";


function TemporaryLoader() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <img style={{ width: "80px", height: "80px" }} src={require("../assets/flying-airplane.gif")} alt="airplane" />
            <img style={{ width: "80px", height: "80px" }} src={require("../assets/Loading_icon.gif")} alt="loading ring" />
        </div>
    );
}

export default TemporaryLoader;