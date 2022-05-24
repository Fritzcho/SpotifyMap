import React, { useState, useEffect } from "react";
import { GET_TRACK } from "../../utils/spotifyclient";
import "./Song.css";

function Song(props) {
  const [song, setSong] = useState(props.song ?? null);
  const [loading, setLoading] = useState(song == null);

  useEffect(() => {
    if (song != null) return;
    //debugging
    console.log("TRACK ENDPOINT " + props.trackEndpoint);
    console.log("TOKEN FROM SONG COMPONENT: " + props.token);
    const fetchData = async () => {
      const res = await GET_TRACK(props.token, props.trackEndpoint);
      console.log("RESPONSE: " + res);
      if (res.status !== 200) {
        setSong(null);
      } else {
        const data = await res.json();
        console.log("DATA: " + data);
        setSong(data);
      }
    };
    fetchData()
      .then(setLoading(false))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {}, [loading]);

  if (song === null && !loading) {
    return <div>No song</div>;
  } else {
    return loading ? (
      <div className="loadingBackground" />
    ) : (
      <div className="Song">
        <div className="coverArt">
          <img src={song.album.images[0].url} alt="" />
        </div>
        <div className="songDescription">
          <h3>{song.name}</h3>
          <p>{song.album.artists[0].name}</p>
        </div>
      </div>
    );
  }
}

export default Song;
