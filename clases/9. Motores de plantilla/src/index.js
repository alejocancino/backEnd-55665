import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";

// ********************************
// Rutas
import { userRouter } from "./routes/index.js";

// ********************************
// CONSTANTES
const app = express();
const PORT = 8080;

// ********************************
// MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ********************************
// SETTING HANDLEBARS
app.use("/", express.static(path.join(__dirname, "/public")));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// ********************************
// ROUTES - ENDPOINTS
app.use("/users", userRouter);

// ********************************
// Server
app.listen(PORT, () => console.log("Server on port: " + PORT));
