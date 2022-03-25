import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";

import styles from "./RoverDetail.module.css";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import key from "../../key.js";

//render fetched Mars photos
let FetchedPhotos = ({ photos }) => {
  // if no photos are found on a selected day, display error message
  if (photos.length === 0) {
    return (
      <div>
        No photos found for the selected date. Please choose a different date
        from the calendar.
      </div>
    );
  } else {
    return (
      <ul className={styles.photoList}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img alt="" src={photo.img_src} className={styles.roverPhoto} />
          </li>
        ))}
      </ul>
    );
  }
};

//date picker
let Calendar = ({ date, setDate }) => {
  /*
    This page has two separate date hooks
    
    Calendar uses rawDate, with a JavaScript date object for the MUI DatePicker

    RoverDetail uses date, with a formatted string for API calls

  */
  const [rawDate, setRawDate] = useState(Date.now());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={rawDate}
        onChange={(newDate) => {
          setRawDate(newDate); //update Calendar date

          //format date for API requests
          let formatDate =
            newDate.getFullYear() +
            "-" +
            newDate.getMonth() +
            "-" +
            newDate.getDate();

          setDate(formatDate); //update API date
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

//
function RoverDetail() {
  const [photos, setPhotos] = useState([]); //store json of Mars photos
  const [loading, setLoading] = useState(true); //display loading message while API request has not returned

  const params = useParams(); //get rover id from React Router

  let initDate = new Date(); // initialize new Date object with current date
  initDate =
    initDate.getFullYear() +
    "-" +
    initDate.getMonth() +
    "-" +
    initDate.getDate();

  const [date, setDate] = useState(initDate); //date hook with formatted date

  //make NASA API call
  useEffect(() => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${params.name}/photos?earth_date=${date}&api_key=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.photos);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [date]);
  //re-render every time new date is selected by passing date as second param in useEffect

  return (
    <div id={styles.RoverDetail}>
      <h1>{params.name}</h1>
      <Button
        variant="outlined"
        size="large"
        className={styles.returnButton}
        component={Link}
        to="/"
      >
        Return to rover list
      </Button>

      <div className={styles.calendarContainer}>
        <Calendar date={date} setDate={setDate} />
      </div>

      {loading ? "Loading photos..." : <FetchedPhotos photos={photos} />}
    </div>
  );
}

export default RoverDetail;
