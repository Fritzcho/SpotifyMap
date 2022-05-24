import React, {useState, useEffect} from "react";
import "./CountryInfo.css";
import axios from 'axios'
import PulseLoader from "react-spinners/PulseLoader";

export default function CountryInfo(props) {
  const [tracks, setTracks] = useState([]);
  const { loading, setLoading } = useState(true);
  const getPlaylistId = async (e) => {
    let token = window.localStorage.getItem("token")
    console.log(token)
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/browse/categories/toplists/playlists?limit=20&offset=0&country="+"DK", {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    {/*item.name === "Topp 50 – Sverige"*/}
    const id = data.playlists.items.find(item => item.name.includes("Topp 50")).id
    e.preventDefault()
    const response = await axios.get("https://api.spotify.com/v1/playlists/"+id, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    setTracks(response.data.tracks.items)
  }

  useEffect(() => {}, [loading]);
  return (
    <div className="infoContainer">
      <h2>{props.name}</h2>
      {!loading ? (
        <PulseLoader color={"green"} loading={loading} size={20} />
      ) : (
        <p>dsad</p>
      )}
      <button onClick={getPlaylistId}>Test get</button>
    </div>
  );
}
