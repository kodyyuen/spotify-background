import axios from "axios";

const MXMController = (app) => {
  const MXM_BASE_URL = "https://api.musixmatch.com/ws/1.1";

  const getLyrics = async (req, res) => {
    let url = new URLSearchParams({
      q_track: req.params.track,
      q_artist: req.params.artist,
      apikey: process.env.MXM_ACCESS_TOKEN,
    });
    let search;
    try {
      search = await axios.get(
        `${MXM_BASE_URL}/track.search?${url.toString()}`
      );
    } catch (e) {
      if (e.message.header.status_code > 200) {
        res.sendStatus(404);
        return;
      }
    }

    console.log(req.params)
    console.log(req.params.track)
    console.log(req.params.artist)

    const { track_id } = search.data.message.body.track_list[0].track;

    url = new URLSearchParams({
      track_id: track_id,
      apikey: process.env.MXM_ACCESS_TOKEN,
    });

    let lyrics;

    try {
      lyrics = await axios.get(
        `${MXM_BASE_URL}/track.lyrics.get?${url.toString()}`
      );
    } catch (e) {
      if (e.message.header.status_code > 200) {
        res.sendStatus(404);
        return;
      }
    }
    console.log(lyrics.data)
    console.log(lyrics.data.message.body)
    const { lyrics_body } = lyrics.data.message.body.lyrics;
    const parseLyrics = lyrics_body.split("*******")[0];
    
    console.log(parseLyrics)
    res.json(parseLyrics)
    // res.json(JSON.stringify(parseLyrics));
    // res.json(lyrics)
  };

  app.get("/mxm/lyrics/:track/:artist", getLyrics);
};

export default MXMController;
