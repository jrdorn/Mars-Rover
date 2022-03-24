import React, { useState, useEffect } from "react";

// import MyComponent from "./components/MyComponent/MyComponent";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import styles from "./RoverListing.module.css";

//
//
//
const key = "DEMO_KEY";
//
//
//

// listItems = data.rovers.map((rover) => (
//           <Rover
//             name={rover.name}
//             landing_date={rover.landing_date}
//             launch_date={rover.launch_date}
//             total_photos={rover.total_photos}
//           />

// const Table = (props) => {
//     return (
//         <div>
//             <BootstrapTable data={props.data}
//                             trClassName={rowClassNameFormat}>
//                 <TableHeaderColumn isKey dataField='id' />
//                 <TableHeaderColumn dataField='name' />
//                 <TableHeaderColumn dataField='username' />
//             </BootstrapTable>
//             <p>{props.isFetching ? 'Fetching users...' : ''}</p>
//         </div>
//     )

//
let FetchedRovers = ({ rovers }) => {
  return (
    <ul>
      {rovers.map((rover) => (
        <li key={rover.id}>
          <div>Name: {rover.name}</div>
          <div>Landing date: {rover.landing_date}</div>
          <div>Launch date: {rovers.launch_date}</div>
          <div>Photos: {rovers.total_photos}</div>
          <div>Cameras: </div>
        </li>
      ))}
    </ul>
  );

  //
  // for (let i = 0; i < rovers.length; i++) {
  //   return (
  //     <li>
  //       <div>Name: {rovers[i].name}</div>
  //       <div>Landing date: {rovers[i].landing_date}</div>
  //       <div>Launch date: {rovers[i].launch_date}</div>
  //       <div>Photos: {rovers[i].total_photos}</div>
  //       <div>Cameras: </div>
  //     </li>
  //   );
  // }
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
      <p>RoverListing</p>

      <ul>
        {loading ? "Loading rovers..." : <FetchedRovers rovers={rovers} />}
      </ul>

      <Button component={Link} to="/detail">
        Link to detail
      </Button>
    </div>
  );
}

// return <Table data={data.users} isFetching={data.isFetching} />;

export default RoverListing;
