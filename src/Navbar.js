import React from "react";
import SignOut from "./components/SignOut";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#7F9CC6" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          <img
            src={require("./assets/tripit_logo.png")}
            alt="logo"
            width="120"
            className="tplogo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="/create"
                style={{ color: "white" }}
              >
                Create Itinerary
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/history"
                style={{ color: "white" }}
              >
                History
              </a>
            </li>
          </ul>
        </div>
        <SignOut />
      </div>
    </nav>
  );
}

export default Navbar;
