// Importaciones librerias
import express from "express";
import handlebars from 'express-handlebars'
import dotenv from "dotenv";
import path from 'path'

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

// ** Setting public **
app.use("/", express.static(path.join(__dirname, "/public")));

// ** Handlebars **
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
  MongoSingleton.getInstance();
});