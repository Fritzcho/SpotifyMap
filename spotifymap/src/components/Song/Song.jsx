import React, {useState, useEffect} from "react";
import { GET_TRACK } from "../../utils/spotifyclient";
import "./Song.css";

function Song(token, trackEndpoint){
    const [song, setSong] = useState(null);

    useEffect(()=>{
        console.log("IN USE EFFECT")
        const fetchData = async () =>{
          const res = await GET_TRACK(token, trackEndpoint);
          console.log("DATA: " + res)
          setSong(res);
        };
        fetchData().then(
        ).catch(e =>{
          console.log(e);
        })
    
      }, []);

    if (song === null){
      return(<div>No song</div>)
    }
    else{
      return(
        <div className="Song">
         <div className="coverArt">
            <img src={song.album.images[0].url} alt="" />
          </div>
          <div className="songDescription">
            <h3>{song.name}</h3>
            <p>{song.album.artists[0].name}</p>
          </div>
        </div>
    ) 
    }      
}

export default Song;