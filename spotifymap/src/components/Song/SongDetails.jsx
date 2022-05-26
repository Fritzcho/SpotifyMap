import React, { useState, useEffect } from "react";
import { GET_TRACK } from "../../utils/spotifyclient";
import "./Song.css";

function SongDetails(props){
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
        await fetch('https://api.spotify.com/v1/me/player/play', {
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

    if (song === null && !loading) {
        return <div>No song</div>;
    }else {
        return loading ? (
          <div className="loadingBackground" />
        ) : (
            <div class="SongDetails">
                <div className="coverImage">
                    <img src={song.album.images[0].url} alt="No image" />
                </div>
            <h1>{song.name}</h1>
            <img onClick={playSong} src={require('../../assets/icons/play.png')} className="smap__song-playButtonDetails"/>
            <div className="albumInfo">
                <div className="artists">
                    <p><b>Artists: </b>{
                    song.artists.map(artist =>(
                        <span>{artist.name !== song.artists[0].name ? ", " + artist.name : artist.name}</span>
                    ))
                    }</p>
                </div>
                <p className="albumName"><b>Album: </b>{song.album.name}</p>
                <p className="releaseDate"><b>Release date: </b>{song.album.release_date}</p>
            </div>
            <h3>Popularity:</h3>
            <div className="popularity">
                <div className="popularityMeter">
                <style>{"\
                    .popularityMeter{\
                    width:"+ song.popularity +"%;\
                    }\
                "}</style>
                </div>
            </div>
        </div>
        );
    }
    }

export default SongDetails;