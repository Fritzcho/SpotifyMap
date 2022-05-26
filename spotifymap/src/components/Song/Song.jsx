import React, { useState, useEffect } from "react";
import { GET_TRACK } from "../../utils/spotifyclient";
import "./Song.css";
import { animated, useSpring, config } from "react-spring";

function Song(props) {
  const [song, setSong] = useState(props.song ?? null);
  const [hover, setHover] = useState(false);
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
    console.log(song.href);
    await fetch("	https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uris: ["spotify:track:" + song.id],
      }),
    });
  };

  const springMain = useSpring({
    height: hover ? 120 : 100,
    background: hover
      ? "radial-gradient(#282C70ff, #282C70ff, #282C70ff, #282C70ff)"
      : "radial-gradient(#282C7000, #282C7000, #282C7000, transparent)",
    textShadow: hover ? "2px 2px 4px black" : "0px 0px 0px white",
    backgroundSize: hover ? "200% 90%" : "30% 90%",
    backgroundPosition: hover ? "0px" : "-300px",
  });

  const springImg = useSpring({
    width: hover ? 120 : 100,
    height: hover ? 120 : 100,
    zIndex: hover ? 40 : 5,
    boxShadow: hover
      ? "15px 10px 10px 0px rgba(0, 0, 0, 0.5)"
      : "0px 0px 0px 0px rgba(0, 0, 0, 0.2)",
    immediate: (key) => key === "zIndex" && hover == true,
  });

  useEffect(() => {}, [loading]);

  if (song === null && !loading) {
    return <div>No song</div>;
  } else {
    return loading ? (
      <div className="loadingBackground" />
    ) : (
      <animated.div
        className="Song"
        style={springMain}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="smap__song-meta">
          {song.album.images[0] ? 
            <div className="coverArt">
              <animated.img
                class="smallImage"
                style={springImg}
                src={song.album.images[0].url}
                alt=""
              />
          </div>
          : <div className="coverArtFiller"></div>} 
          <div className="songDescription">
            <h3>
              <label>{song.name}</label>
            </h3>
            <label>{song.album.artists[0].name}</label>
          </div>
        </div>
        <img
          onClick={playSong}
          src={require("../../assets/icons/play.png")}
          className="smap__song-playButton"
        />
      </animated.div>
    );
  }
}

export default Song;
