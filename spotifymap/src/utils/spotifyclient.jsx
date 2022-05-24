export const CLIENT_ID = 'ba8c147b930b42fe9e01a1a1266299d4'; // Your client id
export const REDIRECT_URI = "http://localhost:3000";
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
export const RESPONSE_TYPE = 'token';

export const GET_TRACK = async (token, trackEndpoint) =>{
    //HÅRDKODAD MED EXEMPELDATA. CORS BRÅKAR NÄR JAG SKICKAR EN STRÄNG MED PARAMTERAR
    console.log('EP: ' + trackEndpoint)
    console.log(`Bearer: ${token}`)
    const res = await fetch(trackEndpoint,{
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`,'Content-Type': 'json', 'Accept': 'json'}
    });
    console.log(res)
    return res;
}