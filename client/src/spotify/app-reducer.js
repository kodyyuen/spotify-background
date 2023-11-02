import { createSlice } from "@reduxjs/toolkit";
import { getLyricsThunk, getSpotifyCurrentSongThunk } from "./app-thunks";

const initialState = {
  currentSong: null,
  lyrics: "",
};

const AppReducer = createSlice({
  name: "app",
  initialState,
  extraReducers: {
    [getSpotifyCurrentSongThunk.fulfilled]: (state, action) => {
      state.currentSong = action.payload;
      console.log(action.payload)
    },
    [getSpotifyCurrentSongThunk.rejected]: (state, action) => {
        console.log("getSpotifyCurrentSongThunk.rejected");
        console.log(action);
    },
    [getLyricsThunk.fulfilled]: (state, action) => {
      state.lyrics = action.payload.data;
      console.log(action)
    },
    [getLyricsThunk.rejected]: (state, action) => {
        console.log("getSpotifyCurrentSongThunk.rejected");
        console.log(action);
    },
  },
});

export default AppReducer.reducer;
