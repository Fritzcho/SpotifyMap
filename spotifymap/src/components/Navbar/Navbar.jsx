import React, { useEffect, useState } from "react";
import "./navbar.css";
import App from "../../screens/HomeScreen/App";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState("");

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="smap__navbar">
      <div className="smap__navbar--icon">Filler</div>
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
      <div className="smap-navbar--logout">
        <Link to="/login" onClick={logout}>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
