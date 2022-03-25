import React, { useState, useEffect } from "react";
import key from "../../key.js";
import styles from "./RoverListing.module.css";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// pass rover Json to individual rover boxes nested inside a rover list
let FetchedRovers = ({ rovers }) => {
  return (
    <div className={styles.roverList}>
      {/* map desired props of each element in rover array to DOM elements */}
      {rovers.map((rover) => (
        <div className={styles.roverBox} key={rover.id}>
          {/* Name */}
          <h2>{rover.name}</h2>

          {/* Landing Date */}
          <div className={styles.cardFont}>
            <span className={styles.cardHeader}>Landing date: </span>
            {rover.landing_date}
          </div>

          {/* Launch Date */}
          <div className={styles.cardFont}>
            <span className={styles.cardHeader}>Launch date: </span>
            {rover.launch_date}
          </div>

          {/* Photos */}
          <div className={styles.cardFont}>
            <span className={styles.cardHeader}>Photos: </span>
            {rover.total_photos}
          </div>

          {/* Cameras */}
          <div className={styles.cardFont}>
            <span className={styles.cardHeader}>Cameras: </span>
            <select className={styles.cameraList}>
              {rover.cameras.map((camera) => (
                <option value={camera.name}> {camera.name} </option>
              ))}
            </select>
          </div>
          <Button
            variant="outlined"
            component={Link}
            to={`/detail/${rover.name}`}
          >
            View Photos
          </Button>
        </div>
      ))}
    </div>
  );
};

//render page displaying rover cards
function RoverListing() {
  const [rovers, setRovers] = useState([]); //store rover API data
  const [loading, setLoading] = useState(true); //once data is fetched, set to false and display data

  //fetch Mars rover json from NASA API
  useEffect(() => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${key}`)
      .then((res) => res.json())
      .then((data) => {
        setRovers(data.rovers);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []); // pass emptyarray to run only once

  return (
    <div id={styles.RoverListing}>
      <h1>Mars Rovers 🚀</h1>

      {loading ? "Loading rovers..." : <FetchedRovers rovers={rovers} />}
    </div>
  );
}

export default RoverListing;
