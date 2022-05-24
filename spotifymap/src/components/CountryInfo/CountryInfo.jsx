import React from "react";
import "./CountryInfo.css";
import axios from 'axios'

export default function CountryInfo(props) {
  return (
    <div className="infoContainer">
      <h2>{props.name}</h2>
      {/* <button onClick={getPlaylistId}>Test get</button> */}
    </div>
  );
}
