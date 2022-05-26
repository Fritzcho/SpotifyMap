import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Navbar, Loginpage } from "./components";
import { HomeScreen } from "./screens";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/login" element={<Loginpage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
