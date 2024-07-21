import path from "path";
import dotenv from "dotenv";
import logger from "./logger";

const environment: string = process.env.NODE_ENV ?? "local";

const result = dotenv.config({
  path: path.join(__dirname, `/env/.env.${environment}`),
});

if (result.error) {
  logger.error("Error loading Env file:", result.error);
} else {
  console.log("Env file loaded successfully");
}
