import { createSlice } from "@reduxjs/toolkit";
import {
  getLyricsColorsThunk,
  getLyricsThunk,
  getSpotifyCurrentSongThunk,
} from "./app-thunks";

const initialState = {
  songItem: null,
  songName: "",
  songArtist: "",
  lyrics: "",
  colors: [],
};

const AppReducer = createSlice({
  name: "app",
  initialState,
  extraReducers: {
    [getSpotifyCurrentSongThunk.fulfilled]: (state, action) => {
      state.songItem = action.payload;
      if (state.songName !== action.payload.item.name) {
        state.songName = action.payload.item.name;
      }
      if (state.songArtist !== action.payload.item.artists[0].name) {
        state.songArtist = action.payload.item.artists[0].name;
      }
      console.log(action.payload);
    },
    [getSpotifyCurrentSongThunk.rejected]: (state, action) => {
      console.log("getSpotifyCurrentSongThunk.rejected");
      console.log(action);
    },
    [getLyricsThunk.fulfilled]: (state, action) => {
      state.lyrics = action.payload.data;
      console.log(action.payload);
    },
    [getLyricsThunk.rejected]: (state, action) => {
      console.log("getLyricsThunk.rejected");
      console.log(action);
    },
    [getLyricsColorsThunk.fulfilled]: (state, action) => {
      console.log(action.payload);
      console.log(JSON.parse(action.payload.data));

      state.colors = JSON.parse(action.payload.data);
      console.log(state.colors);
    },
    [getLyricsColorsThunk.rejected]: (state, action) => {
      console.log("getLyricsColorsThunk.rejected");
      console.log(action);
    },
  },
});

export default AppReducer.reducer;
