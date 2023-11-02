import express from "express";
import cors from "cors";
import "dotenv/config";
import MXMController from "./controllers/mxm-controller.js";
import ChatGPTController from "./controllers/chatgpt-controller.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  }),
  express.json()
);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

MXMController(app);
ChatGPTController(app);

app.listen(process.env.PORT || 4000);
