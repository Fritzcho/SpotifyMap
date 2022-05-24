import React, { useEffect, useState } from "react";
import "./App.css";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  RESPONSE_TYPE,
  AUTH_ENDPOINT,
} from "../../utils/spotifyclient";
import { useJwt } from 'react-jwt';

import Map from "../../components/Map/Map.jsx";
import Song from "../../components/Song/Song.jsx";
import MapContext from "../../components/Map/MapContext";
import CountryInfo from "../../components/CountryInfo/CountryInfo";

function App() {
  const [token, setToken] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { decodedToken, isExpired } = useJwt(window.localStorage.getItem("token"));

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token");

    console.log(isExpired)
    if (isExpired) {
      setToken("")
      window.localStorage.removeItem("token")
    }

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

  }, [])


  return (
    <div className="App">
      <header className="App-header">
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
              to Spotify</a>
          : ""}

      </header>
      <MapContext.Provider value={{ selectedCountry, setSelectedCountry }}>
        <div className="Map">
          <Map />
          {selectedCountry == null ? null : (
            <CountryInfo
              name={selectedCountry.properties.name_en}
              coords={selectedCountry.geometry.coordinates[0][0][0]}
            />
          )}
        </div>
      </MapContext.Provider>
    </div>
  );
}

function Info(props) {
  return (
    <div className="infoContainer">
      <h2>{props.name}</h2>
    </div>
  );
}

export default App;
