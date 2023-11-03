import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLyricsColorsThunk,
  getLyricsThunk,
  getSpotifyCurrentSongThunk,
} from "../spotify/app-thunks";

const GradientBackground = () => {
  const [gradient, setGradient] = useState(["red", "blue", "yellow"]);
  const [lastCurrentSong, setLastCurrentSong] = useState("");
  const [repeat, setRepeat] = useState(true);
  const { songItem, songName, songArtist, lyrics, colors } = useSelector(
    (state) => state.app
  );
  let timer;
  const dispatch = useDispatch();

  const colors2 = [
    "rgb(33, 47, 61)",
    "red",
    "(46, 204, 113)",
    "rgb(255, 215, 0)",
  ];
  const style = {
    background: `
    linear-gradient(140deg, ${colors[0]}, rgba(0,0,0,0) 70%),
    linear-gradient(220deg, ${colors[1]}, rgba(0,0,0,0) 70%),
    linear-gradient(320deg, ${colors[2]}, rgba(0,0,0,0) 70%),
    linear-gradient(40deg, ${colors[3]}, rgba(0,0,0,0) 70%)`,
    // background: `linear-gradient(45deg, ${gradient.join(",")})`,
    // background: "radial-gradient(#e66465, #9198e5, blue, red)",
    // background: `linear-gradient(45deg, #e66465, #9198e5)`,
    // https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient
    // https://medium.com/@stvehayes/working-with-spotifys-api-to-display-currently-playing-with-react-99544f8797d8
    // https://leerob.io/blog/spotify-api-nextjs
    backgroundSize: "100% 100%",
    // width: "100%",
    // height: "100%",
  };
  const getRandomKey = () => {
    return Math.random(100);
  };
  const changeGradient = (colors) => {
    setGradient(colors);
  };

  const updateCurrentSong = () => {
    console.log("updateCurrentSong");
    console.log("repeat: " + repeat);
    if (repeat) {
      dispatch(getSpotifyCurrentSongThunk());
      timer = setTimeout(updateCurrentSong, 10000);
    } else {
      clearTimeout(timer);
      return;
    }
  };

  const toggleCurrentSongFunc = () => {
    let r = !repeat;
    setRepeat(r);
    updateCurrentSong();
  };

  useEffect(() => {
    console.log("useEffect");
    // dispatch(getSpotifyCurrentSongThunk());
    updateCurrentSong();
  }, []);

  useEffect(() => {
    console.log("balls1");
    // console.log(colors)
    // if (currentSong && lastCurrentSong !== currentSong.item.name) {
    //   dispatch(
    //     getLyricsColorsThunk({
    //       track: currentSong.item.name,
    //       artist: currentSong.item.artists[0].name,
    //     })
    //   );
    //   setLastCurrentSong(currentSong.item.name);
    //   console.log('balls2')
    //   console.log(currentSong.item.name)
    //   console.log(lastCurrentSong)
    dispatch(
      getLyricsColorsThunk({
        track: songName,
        artist: songArtist,
      })
    );
  }, [songName]);

  return (
    <div key={getRandomKey()} style={style} className="bg-animation min-vh-100 container-fluid">
      {songName && (
        <div className="row">
          <h1>{songName}</h1>
        </div>
      )}
      <div className="row">
        <h1>{lyrics}</h1>
      </div>
      <button onClick={() => toggleCurrentSongFunc()}>Click me</button>
    </div>
  );
};

export default GradientBackground;
