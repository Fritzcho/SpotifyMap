import React, { useEffect, useState } from "react";
import "./navbar.css";
import App from "../../screens/HomeScreen/App";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    setLoggedIn(window.sessionStorage.getItem("token") ? true : false);
  }, []);

  const logout = () => {
    setToken(null);
    window.sessionStorage.removeItem("token");
  };

  return (
    <div className="smap__navbar">
      <div className="logoHolder">
        <a href="/">
          {/* <p>
            <b>
              SPOTIFY<sup>®</sup> MAP
            </b>
          </p> */}
          <img src={require('../../assets/Spotify_Logo_RGB_Green.png')} width='100px'/>
        </a>
      </div>
      <div className="smap__navbar--links">
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/info">Info</Link>
        </p>
        <p>
          <Link to="/contact">Contact</Link>
        </p>
      </div>
      {window.sessionStorage.getItem("token") ? (
        <div className="smap-navbar--logout">
          <Link to="/login">
            <button onClick={logout}>Log out</button>
          </Link>
        </div>
      ) : (
        <div className="smap-navbar--logout">Not logged in</div>
      )}
    </div>
  );
};

export default Navbar;
