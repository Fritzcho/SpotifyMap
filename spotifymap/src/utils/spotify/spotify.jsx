import axios from "axios";

const token = window.sessionStorage.getItem("token");
export default async function queryTrack(title, artist) {
  try {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/search?q=track:${title}+artist:${artist}&type=track&limit=1`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
