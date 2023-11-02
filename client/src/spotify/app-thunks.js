import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLyrics, getSpotifyCurrentSong } from "./app-service";

export const getSpotifyCurrentSongThunk = createAsyncThunk(
  "getSpotifyCurrentSong",
  async () => await getSpotifyCurrentSong()
);

export const getLyricsThunk = createAsyncThunk(
  "getLyrics",
  async (params) => await getLyrics(params)
);