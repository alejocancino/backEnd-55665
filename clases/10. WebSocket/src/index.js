import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./path.js";
import path from "path";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { userRouter } from "./routes/index.js";

// ******************************** CONSTANTES
//
const app = express();

const server = createServer(app);
const io = new Server(server);

const PORT = 8080;

// ******************************** MiddleWares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ******************************** SETTING HANDLEBARS

app.use("/", express.static(path.join(__dirname, "/public")));
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// ******************************** ROUTES - ENDPOINTS
app.use("/users", userRouter);

// ******************************** Socket

io.on("connect", (socket) => {
  console.log("Usuario conectado");
  socket.emit("mensaje","jijio")
  socket.on("respuesta", (data)=> {
    console.log(data)
  })
});

// ******************************** Server
server.listen(PORT, () => console.log("Server on port: " + PORT));
