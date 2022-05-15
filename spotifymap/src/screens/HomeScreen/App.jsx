import React, {useEffect} from 'react';
import './App.css';
import {CLIENT_ID, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT} from '../../utils/spotifyclient'

function App() {  
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("spotifytoken")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("spotifytoken", token)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
          Login to Spotify
        </a> 
      </header>
    </div>
  );
}

export default App;
