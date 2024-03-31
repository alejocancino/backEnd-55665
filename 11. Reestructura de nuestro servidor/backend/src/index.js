// Importaciones librerias
import express from "express";
import dotenv from "dotenv";

// Importaciones internas
import { MongoSingleton } from "./config/dbConnection.js";
import {__dirname} from "./path.js";
import { initializeGlobalsMiddlewares } from "./middleware/configuration.middleware.js";

dotenv.config({
  path: ".env.dev",
});
const app = express();
const PORT = process.env.PORT;
initializeGlobalsMiddlewares(app)

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  MongoSingleton.getInstance();
});