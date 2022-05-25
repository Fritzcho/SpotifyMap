import React, { useState, useEffect, useContext } from "react";
import "./CountryInfo.css";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import Song from "../Song/Song";
import MapContext from "../Map/MapContext";

export default function CountryInfo(props) {
  const { selectedCountry } = useContext(MapContext);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("token");
  const getPlaylistId = async () => {
    console.log(token);

    try {
      const { data } = await axios.get(
        "https://api.spotify.com/v1/browse/categories/toplists/playlists?limit=20&offset=0&country=" +
          props.code,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const id = data.playlists.items.find((item) =>
        item.name.includes("Topp 50")
      ).id;
      const response = await axios.get(
        "https://api.spotify.com/v1/playlists/" + id,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setTracks(response.data.tracks.items);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }

    {
      /*item.name === "Topp 50 – Sverige"*/
    }
  };

  useEffect(() => {
    setLoading(true);
    getPlaylistId();
  }, [selectedCountry]);

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  return (
    <div className="infoContainer">
      <h2>{props.name}</h2>
      {loading ? (
        <PulseLoader color={"green"} loading={loading} size={20} />
      ) : (
        <div className="songContainer">
          {tracks.map((track) => {
            return (
              <Song
                token={token}
                trackEndpoint={track.track.href}
                song={track.track}
              />
            );
          })}
        </div>
      )}
      <button onClick={getPlaylistId}>Test get</button>
    </div>
  );
}