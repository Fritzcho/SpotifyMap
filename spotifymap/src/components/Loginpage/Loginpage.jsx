import React, { useEffect, useState, uselocalstate } from "react";
import "./loginpage.css";
import { loginUrl } from "../../utils/spotifyclient";

import { Navigate } from "react-router-dom";

const Loginpage = () => {
  const [token, setToken] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.sessionStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.sessionStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return (
    <div className="lp-wrapper">
      <div className="lp-content">
        <h3 className="lp-login">Login</h3>
        <p className="lp-text">
          This app requires a connection to your Spotify account, please use the
          button below to login
        </p>
        <a href={loginUrl}>
          <button className="loginButton">CONNECT WITH SPOTIFY</button>
        </a>
      </div>
    </div>
  );
};

export default Loginpage;
