import React, { useEffect, useState } from "react";
import "./App.css";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  RESPONSE_TYPE,
  AUTH_ENDPOINT,
} from "../../utils/spotifyclient";
import { useJwt } from "react-jwt";

import Map from "../../components/Map/Map.jsx";
import Song from "../../components/Song/Song.jsx";
import MapContext from "../../components/Map/MapContext";
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import { Loginpage } from "../../components";

function App() {
  const [token, setToken] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    console.log(isExpired);
    if (isExpired) {
      setToken("");
      window.localStorage.removeItem("token");
    }

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
  console.log("TOKEN FROM APP: " + token);
  if (window.localStorage.getItem("token")) {
    return (
      <div className="App">
        <MapContext.Provider value={{ selectedCountry, setSelectedCountry }}>
          <div className="Map">
            <Map />
            {selectedCountry == null ? null : (
              <CountryInfo
                name={selectedCountry.properties.name_en}
                coords={selectedCountry.geometry.coordinates[0][0][0]}
                code={selectedCountry.properties.iso_3166_1}
              />
            )}
          </div>
        </MapContext.Provider>
      </div>
    );
  } else {
    return <Loginpage />;
  }
}

function Info(props) {
  return (
    <div className="infoContainer">
      <h2>{props.name}</h2>
    </div>
  );
}

export default App;
