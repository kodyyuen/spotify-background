import axios from "axios";
import { Buffer } from "buffer";

const getApiKey = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      refresh_token: process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN,
      grant_type: "refresh_token",
    },
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`,
          "utf-8"
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

export const getSpotifyCurrentSong = async () => {
  const apiKey = await getApiKey();

  const response = await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: { Authorization: `Bearer ${apiKey}` },
    }
  );
  return response.data;
};

export const getLyrics = async ({ track, artist }) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_BASE_URL}/mxm/lyrics/${track}/${artist}`
  );
};

export const getLyricsColors = async ({ track, artist }) => {
  return await axios.get(
    `${process.env.REACT_APP_BACKEND_BASE_URL}/gpt/lyrics/${track}/${artist}`
  );
};
