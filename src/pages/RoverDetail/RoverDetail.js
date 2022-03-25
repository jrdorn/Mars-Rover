import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";

import styles from "./RoverDetail.module.css";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import key from "../../key.js";

/**
TODO:


  Styles

*/

//
let FetchedPhotos = ({ photos }) => {
  if (photos.length === 0) {
    return (
      <div>
        No photos found for the selected date. Please choose a different date
        from the calendar.
      </div>
    );
  } else {
    return (
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img alt="" src={photo.img_src} className={styles.roverPhoto} />
          </li>
        ))}
      </ul>
    );
  }
};

//
let Calendar = ({ date, setDate }) => {
  const [rawDate, setRawDate] = useState(Date.now());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={rawDate}
        onChange={(newDate) => {
          setRawDate(newDate);

          let formatDate =
            newDate.getFullYear() +
            "-" +
            newDate.getMonth() +
            "-" +
            newDate.getDate();

          setDate(formatDate);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

//
function RoverDetail() {
  //
  const [photos, setPhotos] = useState([]); //
  const [loading, setLoading] = useState(true); //
  //
  const params = useParams();

  let initDate = new Date(); // initialize new Date object with current date
  initDate =
    initDate.getFullYear() +
    "-" +
    initDate.getMonth() +
    "-" +
    initDate.getDate();
  const [date, setDate] = useState(initDate);

  //
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
      <Button component={Link} to="/">
        Return to rover list
      </Button>

      <Calendar date={date} setDate={setDate} />

      {loading ? "Loading photos..." : <FetchedPhotos photos={photos} />}
    </div>
  );
}

export default RoverDetail;
