import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import styles from "./RoverListing.module.css";

import key from "../../key.js";

/*
TODO:

  click on rover => direct to specific detail page with all photos for one day




  CSS grid, layout

  MUI components

  Responsive design

  Comments

*/

//
let FetchedRovers = ({ rovers }) => {
  return (
    <ul>
      {rovers.map((rover) => (
        <li key={rover.id}>
          <div>Name: {rover.name}</div>
          <div>Landing date: {rover.landing_date}</div>
          <div>Launch date: {rover.launch_date}</div>
          <div>Photos: {rover.total_photos}</div>
          <div>
            Cameras:
            {rover.cameras.map((camera) => (
              <div>{camera.name}</div>
            ))}
          </div>
          <Link to={`/detail/${rover.name}`}>View rover photos</Link>
        </li>
      ))}
    </ul>
  );
};

//
function RoverListing() {
  //
  const [rovers, setRovers] = useState([]);
  const [loading, setLoading] = useState(true);

  //
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
  }, []);

  return (
    <div id={styles.RoverListing}>
      <p>Mars Rovers</p>

      {loading ? "Loading rovers..." : <FetchedRovers rovers={rovers} />}
    </div>
  );
}

export default RoverListing;
