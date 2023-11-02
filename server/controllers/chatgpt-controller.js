import OpenAI from "openai";

const ChatGPTController = (app) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const message = async (req, res) => {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." },
    {role: "user", content: "As time passes, I feel so low\nSearchin' for pieces, covering up the hole\nI'll fight for your love, I'll fight for your soul\nI'll throw all of my cares away for you\nI'll be there to wait for you\n\nMaybe you weren't the one for me\nBut deep down I wanted you to be\nI'll still see you in my dreams\nAll the things that I did for you\nJust wasn't it for you\n\nSo I'll be coasting, I'm roller-coasting\nThrough my emotion\nI will be coasting, roller-coasting\nI'm hoping that you'll come back to me\n\nMoving on seems harder to do\n...\n\n******* This Lyrics is NOT for Commercial use ******* With the lyrics given above, give me exactly four colors associated with the feelings expressed by the artist as RGB values. Do not include any explanations. The RGB values should be provided in a JavaScript list format like so: [rgb(0, 0, 0), rgb(255, 255, 255)]"}],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
    res.json(completion.choices[0]);
  };

  app.get("/gpt", message);
};

export default ChatGPTController;
