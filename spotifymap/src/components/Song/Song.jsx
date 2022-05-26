import React, { useState, useEffect } from "react";
import { GET_TRACK } from "../../utils/spotifyclient";
import "./Song.css";

function Song(props) {
  const [song, setSong] = useState(props.song ?? null);
  const [loading, setLoading] = useState(song == null);
  const token = window.localStorage.getItem("token");


  useEffect(() => {
    if (song != null) return;
    const fetchData = async () => {
      const res = await GET_TRACK(props.token, props.trackEndpoint);
      if (res.status !== 200) {
        setSong(null);
      } else {
        const data = await res.json();
        setSong(data);
      }
    };
    fetchData()
      .then(setLoading(false))
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const playSong = async () => {
    console.log(song.href)
    await fetch('	https://api.spotify.com/v1/me/player/play', {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              "uris": ["spotify:track:"+song.id]
            })
          });
  }

  useEffect(() => {}, [loading]);

  if (song === null && !loading) {
    return <div>No song</div>;
  } else {
    return loading ? (
      <div className="loadingBackground" />
    ) : (
      <div className="Song">
        <div className="smap__song-meta">
          <div className="coverArt">
            <img src={song.album.images[0].url} alt="" />
          </div>
          <div className="songDescription">
            <h3>{song.name}</h3>
            <p>{song.album.artists[0].name}</p>
          </div>
        </div>
        <img onClick={playSong} src={require('../../assets/icons/play.png')} className="smap__song-playButton"/>
      </div>
    );
  }
}

export default Song;
