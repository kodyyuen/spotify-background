import axios from "axios";

const MXMController = (app) => {
  const MXM_BASE_URL = "https://api.musixmatch.com/ws/1.1";

  const getLyrics = async (req, res) => {
    let url = new URLSearchParams({
      q_track: req.params.track,
      q_artist: req.params.artist,
      apikey: process.env.MXM_ACCESS_TOKEN,
    });

    const search = await axios.get(
      `${MXM_BASE_URL}/track.search?${url.toString()}`
    );

    console.log(req.params)
    console.log(req.params.track)
    console.log(req.params.artist)

    const { track_id } = search.data.message.body.track_list[0].track;

    url = new URLSearchParams({
      track_id: track_id,
      apikey: process.env.MXM_ACCESS_TOKEN,
    });

    const lyrics = await axios.get(
      `${MXM_BASE_URL}/track.lyrics.get?${url.toString()}`
    );

    res.send(lyrics.data.message.body.lyrics.lyrics_body);
  };

  app.get("/mxm/get-lyrics/:track/:artist", getLyrics);
};

export default MXMController;
