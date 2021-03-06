import React, { useState, useEffect, useContext } from "react";
import "./CountryInfo.css";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import Song from "../Song/Song";
import MapContext from "../Map/MapContext";
import { useSpring, animated } from "react-spring";
import SongDetails from "../Song/SongDetails";
import getTopTracks from "../../utils/last.fm/lastFm.jsx";
import queryTrack from "../../utils/spotify/spotify.jsx";

export default function CountryInfo(props) {
  const { selectedCountry } = useContext(MapContext);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(null);
  const [playlistId, setPlaylistId] = useState("");
  const token = window.sessionStorage.getItem("token");

  const getLastFmCharts = async () => {
    const lastFmRes = await getTopTracks(props.name);
    //console.log(lastFmRes);

    const res = await Promise.all(
      lastFmRes.tracks.track.map(async (track) => {
        const spotifyTrack = await queryTrack(track.name, track.artist.name);
        if (spotifyTrack != undefined)
          return {
            track: spotifyTrack.tracks.items[0],
            href: spotifyTrack.tracks.items[0].href,
          };
      })
    );

    //console.log(res);
    return res;
  };

  const getPlaylistId = async () => {
    //    console.log(token);
    try {
      console.log("COUNTRY CODE: " + props.code);
      const name =
        props.code === "CZ"
          ? "Topp 50 - tjeckien"
          : props.code === "CN"
          ? "china memes"
          : "Topp 50 - " + props.name;
      const { data } = await axios.get(
        `https://api.spotify.com/v1/search?q=${name}&type=playlist&include_external=audio`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      var filteredArray = data.playlists.items;
      const id = filteredArray.find(
        (item) =>
          item.name.includes("Topp 50 ??? ") || item.name.includes("memes")
      )?.id;

      if (id) {
        setPlaylistId(id);
        const response = await axios.get(
          "https://api.spotify.com/v1/playlists/" + id,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        //console.log(response.data.tracks.items);
        setTracks(response.data.tracks.items);
      } else {
        setPlaylistId(null);
        const lastFmTrack = await getLastFmCharts();
        setTracks(lastFmTrack || !lastFmTrack.error ? lastFmTrack : []);
      }
    } catch (err) {
      //console.log(err);
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

  useEffect(() => {}, [tracks]);

  const ShowDetails = (song) => {
    console.log("SET SONG: " + song.name);
    setShowDetails(song);
  };

  const spring = useSpring({
    transform:
      loading || showDetails != null ? "translateY(-30%)" : "translateY(0%)",
    opacity: loading || showDetails != null ? 0 : 1,
    position: showDetails ? "relative" : "absolute",
  });

  const spring2 = useSpring({
    background: "none",
    position: showDetails ? "absolute" : "relative",
    opacity: showDetails ? 1 : 0,
    transform: showDetails != null ? "translateY(0%)" : "translateY(100%)",
  });

  const spring3 = useSpring({
    height: loading || tracks.length == 0 ? 200 : 700,
  });

  return (
    <animated.div className="infoContainer" style={spring3}>
      <animated.div className="header">
        <h2>{props.name}</h2>
        <div className="countryFlag">
          <img src={`https://countryflagsapi.com/png/${props.code}`} />
        </div>
      </animated.div>
      {loading ? (
        <div className="loadingBackground">
          <PulseLoader color={"#ffffff99"} loading={loading} size={20} />
        </div>
      ) : tracks.length === 0 ? (
        <div className="loadingBackground">
          <h3>Spotify isn't available in {props.name}</h3>
        </div>
      ) : (
        <div
          style={{
            overflow: "visible",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <animated.div className="songContainer" style={spring}>
            {tracks.map((track, index) => {
              return (
                <div class="singleSong" onClick={() => setShowDetails(track.track)}>
                  <Song
                    token={token}
                    trackEndpoint={track.href}
                    song={track.track}
                    index={index}
                    playlistId={playlistId}
                  />
                </div>
              );
            })}
          </animated.div>
          <animated.div className="songContainer" style={spring2}>
            {showDetails != null ? (
              <div>
                <button onClick={() => setShowDetails(null)}>
                  BACK TO LIST
                </button>
                <SongDetails
                  token={token}
                  trackEndpoint={showDetails.href}
                  song={showDetails}
                />
              </div>
            ) : null}
          </animated.div>
        </div>
      )}
    </animated.div>
  );
}
