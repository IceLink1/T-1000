import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";

import questionRoutes from "./routes/question.router.js";

config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/questions", questionRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function Start() {
  try {
    await mongoose.connect(process.env.MONGO_DB).then(() => {
      console.log("Connected to MongoDB");
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

Start();
