import './App.css';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, RESPONSE_TYPE, AUTH_ENDPOINT} from '../../utils/spotifyclient'

function App() {
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
