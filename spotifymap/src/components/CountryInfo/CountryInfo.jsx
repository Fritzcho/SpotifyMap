import React from "react";
import "./CountryInfo.css";

export default function CountryInfo(props) {
  return (
    <div className="infoContainer">
      <h2>{props.name}</h2>
    </div>
  );
}
