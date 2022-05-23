import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
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
    </div>
  );
};

export default Navbar;
