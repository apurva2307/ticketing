import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  console.log("Starting up.....");
  if (!process.env.JWT_SECRET_KEY || !process.env.MONGO_URI) {
    throw new Error("JWT_KEY not accessable.");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log("Listening on port 3000...");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
