import axios from "axios";

const API_KEY = "850f65434fa468cd5cfc237d7c4d4216";
export default async function getTopTracks(country) {
  try {
    const { data } = await axios.get(
      `https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=${API_KEY}&format=json`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
