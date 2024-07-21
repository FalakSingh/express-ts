import mongoose from "mongoose";
import { mongoUri } from "./envVars";
import logger from "./logger";

// Exit application on error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

export default function connect() {
  mongoose
    .connect(mongoUri)
    .then(() => console.log("MongoDB Connection Established"));
}