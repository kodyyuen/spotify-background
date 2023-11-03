import OpenAI from "openai";
import axios from "axios";

const ChatGPTController = (app) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const MXM_BASE_URL = "https://api.musixmatch.com/ws/1.1";

  const getLyrics = async (req) => {
    let url = new URLSearchParams({
      q_track: req.params.track,
      q_artist: req.params.artist,
      apikey: process.env.MXM_ACCESS_TOKEN,
    });

    const search = await axios.get(
      `${MXM_BASE_URL}/track.search?${url.toString()}`
    );
    // console.log("search")
    // console.log(search.data)
    // console.log(search.data.message)

    
    if (search.data.message.header.status_code > 200) {
      return "";
    }

    const { track_id } = search.data.message.body.track_list[0].track;

    url = new URLSearchParams({
      track_id: track_id,
      apikey: process.env.MXM_ACCESS_TOKEN,
    });

    const lyrics = await axios.get(
      `${MXM_BASE_URL}/track.lyrics.get?${url.toString()}`
    );
    if (lyrics.data.message.header.status_code > 200) {
      return "";
    }

    console.log(lyrics.data);
    console.log(lyrics.data.message.body);
    const { lyrics_body } = lyrics.data.message.body.lyrics;
    const parseLyrics = lyrics_body.split("*******")[0];

    return parseLyrics;
  };

  const getResponse = async (req, res) => {
    const lyrics = await getLyrics(req);
    if (!lyrics) {
      res.json(JSON.stringify(["red", "blue", "orange", "green"]));
      return;
    }
    const content = `With the lyrics given below, give me exactly four colors associated with the feelings expressed by the artist as RGB values. The four colors should not be similar to each other or be in the same color group. Do not include any explanations. The RGB values should be provided in a JavaScript list as strings in an RGB() object. The format is found below:

    Format: """
    ["rgb(0, 0, 0)", "rgb(255, 255, 255)", "rgb(128, 128,  128)", "rgb(1, 2, 3)"]
    """

    Lyrics: """
    ${lyrics}
    """`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: content },
      ],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
    res.json(completion.choices[0].message.content);
  };

  app.get("/gpt", getResponse);
  app.get("/gpt/lyrics/:track/:artist", getResponse);
};

export default ChatGPTController;
