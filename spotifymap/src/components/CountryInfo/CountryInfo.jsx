import React, { useState, useEffect } from "react";
import "./CountryInfo.css";
import PulseLoader from "react-spinners/PulseLoader";

export default function CountryInfo(props) {
  const { loading, setLoading } = useState(true);

  useEffect(() => {}, [loading]);

  return (
    <div className="infoContainer">
      <h2>{props.name}</h2>
      {!loading ? (
        <PulseLoader color={"green"} loading={loading} size={20} />
      ) : (
        <p>dsad</p>
      )}
    </div>
  );
}
