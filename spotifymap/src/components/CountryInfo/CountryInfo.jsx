import React, { useState, useEffect, useContext } from "react";
import "./CountryInfo.css";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import Song from "../Song/Song";
import MapContext from "../Map/MapContext";
import { useSpring, animated } from "react-spring";
import getTopTracks from "../../utils/last.fm/lastFm.jsx";
import queryTrack from "../../utils/spotify/spotify.jsx";

export default function CountryInfo(props) {
  const { selectedCountry } = useContext(MapContext);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = window.localStorage.getItem("token");

  const getLastFmCharts = async () => {
    const lastFmRes = await getTopTracks(props.name);
    console.log(lastFmRes);

    const res = await Promise.all([
      lastFmRes.tracks.track.map(async (track) => {
        const spotifyTrack = await queryTrack(track.name, track.artist.name);
        if (spotifyTrack != undefined) return spotifyTrack.tracks.items[0];
      }),
    ]);

    console.log({ res });
    return { res };
  };

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
      console.log(data.playlists);
      const id = data.playlists.items.find(
        (item) =>
          item.name.includes("Topp 50") &&
          !item.name.includes("USA") &&
          !item.name.includes("Världen")
      )?.id;
      console.log(id);
      const response =
        id != undefined
          ? await axios.get("https://api.spotify.com/v1/playlists/" + id, {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            })
          : await getLastFmCharts();
      setTracks(id != null ? response.data.tracks.items : response);
      //console.log(response.data.tracks.items);
    } catch (err) {
      console.log(err);
      setTracks([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPlaylistId();
  }, [selectedCountry]);

  useEffect(() => {}, [tracks]);

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
      ) : (
        <animated.div className="songContainer" style={spring}>
          {tracks.map((track) => {
            return (
              <Song
                token={token}
                trackEndpoint={track.track?.href}
                song={track.track}
              />
            );
          })}
        </animated.div>
      )}
    </animated.div>
  );
}
