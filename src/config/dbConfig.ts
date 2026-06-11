import mongoose from "mongoose";
import serverConfig from "./serverConfig";

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(serverConfig.DB_URL!);

    console.log("Successfully connected to mongodb...");
  } catch (error) {
    console.log("Failed to connect mongodb");
    console.log(error);
  }
}

export default connectDB;