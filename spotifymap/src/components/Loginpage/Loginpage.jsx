import React, { useEffect, useState, uselocalstate } from "react";
import "./loginpage.css";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  RESPONSE_TYPE,
  AUTH_ENDPOINT,
} from "../../utils/spotifyclient";

import { Navigate } from "react-router-dom";

const Loginpage = () => {
  const [token, setToken] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return (
    <div className="lp-wrapper">
      <div className="lp-content">
        <h3 className="lp-login">Login</h3>
        <p className="lp-text">
          You are curently not logged in to spotify please use the butten below
          to login
        </p>
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      </div>
    </div>
  );
};

export default Loginpage;
