import React, { useState, useEffect, useContext } from "react";
import "./CountryInfo.css";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import Song from "../Song/Song";
import MapContext from "../Map/MapContext";
import { useSpring, animated } from "react-spring";
import SongDetails from "../Song/SongDetails";

export default function CountryInfo(props) {
  const { selectedCountry } = useContext(MapContext);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(null);
  const token = window.localStorage.getItem("token");
  const getPlaylistId = async () => {
    console.log(token);

    try {
      console.log("COUNTRY CODE: " + props.code)
      const name = props.code === "CZ" ? "tjeckien" : props.name;
      const { data } = await axios.get(

        `https://api.spotify.com/v1/search?q=Topp 50 - ${name}&type=playlist&include_external=audio`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      var filteredArray = data.playlists.items
      const id = filteredArray.find((item) =>
        item.name.includes("Topp 50 – ")
      ).id 
      console.log("ID: " + id)
      const response = await axios.get(
        "https://api.spotify.com/v1/playlists/" + id,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.name);
      setTracks(response.data.tracks.items);
    } catch (err) {
      console.log(err);
      setTracks([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setShowDetails(null);
    getPlaylistId();
  }, [selectedCountry]);

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);

  const ShowDetails = (song) =>{
    console.log("SET SONG: " + song.name)
    setShowDetails(song);
  }

  const spring = useSpring({
    transform: loading ? "translateY(-300%)" : "translateY(0%)",
    opacity: loading ? 0 : 1,
  });

  const spring2 = useSpring({
    //backdropFilter: loading || tracks.length == 0 ? "blur(0px)" : "blur(1em)",
  });

  const spring3 = useSpring({
    height: loading || tracks.length == 0 ? 200 : 700,
  });

  return (
    <animated.div className="infoContainer" style={spring3}>
      <animated.div className="header">
        <h2>{props.name}</h2>
      </animated.div>
      {loading ? (
        <div className="loadingBackground">
          <PulseLoader color={"#ffffff99"} loading={loading} size={20} />
        </div>
      ) : tracks.length === 0 ? (
        <div className="loadingBackground">
          <h3>Spotify isn't available in {props.name}</h3>
        </div>
      ) : showDetails !== null ? (
        <div className="songContainer">
          <button onClick={() => setShowDetails(null)}>TILLBAKA</button>
          <SongDetails
            token={token}
            trackEndpoint={showDetails.track.href}
            song={showDetails}
          />
        </div>
      ) : (
        <animated.div className="songContainer" style={spring}>
          {tracks.map((track) => {
            return (
              <div onClick={() => ShowDetails(track.track)}>
                <Song
                  token={token}
                  trackEndpoint={track.track.href}
                  song={track.track}
                />
              </div>
            );
          })}
        </animated.div>
      )}
    </animated.div>
  );
}