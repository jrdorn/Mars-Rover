import React from "react";

// import MyComponent from "./components/MyComponent/MyComponent";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import styles from "./RoverDetail.module.css";

function RoverDetail() {
  return (
    <div id={styles.RoverDetail}>
      <p>RoverDetail</p>

      <Button component={Link} to="/">
        Link to listing
      </Button>
    </div>
  );
}

export default RoverDetail;
