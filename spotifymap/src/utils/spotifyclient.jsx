export const CLIENT_ID = 'ba8c147b930b42fe9e01a1a1266299d4'; // Your client id
export const REDIRECT_URI = "http://localhost:3000";
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const RESPONSE_TYPE = 'token';

export const GET_TRACK = async (token, trackEndpoint) =>{
    const res = await fetch(trackEndpoint,{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'json', 'Accept': 'json'}
    });
    console.log(res)
    return res;
}

const scopes = [
    "user-read-recently-played",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-top-read",
    "user-modify-playback-state",
]

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`