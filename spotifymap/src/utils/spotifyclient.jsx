export const CLIENT_ID = 'ba8c147b930b42fe9e01a1a1266299d4'; // Your client id
export const REDIRECT_URI = "http://localhost:3000";
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const RESPONSE_TYPE = 'token';

export const GET_TRACK = async (token, trackEndpoint) =>{
    console.log('trying...')
    //HÅRDKODAD MED EXEMPELDATA. CORS BRÅKAR NÄR JAG SKICKAR EN STRÄNG MED PARAMTERAR
    const res = await fetch("https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl",{
        method: 'GET',
        headers: {'Authorization': 'Bearer BQD6Bsfhq09tZ8DDjnVIwKT2tumzyDEqPsh2YcUu7iGPbWiC66HS9M0GK09eROiH7CFAd8djvAsS5OHJp9ePmrrISLc4VDLGmtHO4A6Ym7zUvC-evXI7UnWl3O--g9H0K7faANcEHfhSslkGOUtUbUk46RrH5qaMGIY'}
    });
    console.log(res)
    const data = await res.json();
    console.log("DATA: " + data)
    return data;
}