import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";

import path from "path";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import { connectionToDB } from "./dao/db/dbConnection.js";
import { initPassport } from "./config/passport.js";

import { prodRouter } from "./routes/endpoints/products.routes.js";
import { cartRouter, authRouter, sessionsRouter } from "./routes/endpoints/index.js";

import {
  homeViewsRouter,
  chatViewsRouter,
  cartViewsRouter,
  realTimeViewsRouter,
  prodViewsRouter,
  authViewsRouter,
} from "./routes/view-routes/index.js";

import { handleSocketConnection } from "./utils/socketHandlers.js";

const PORT = 8081;

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`);
});

connectionToDB();

// ** Middlewares **
app.use(
  session({
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://alejojcancino:PPATlZpDvsijuMWD@cluster0.wbdeg56.mongodb.net/ecommerce",
      ttl: 1000,
    }),
    secret: "quasar-secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initPassport();
app.use(passport.initialize());
app.use(passport.session());

// Middleware para enviar el objeto io a las rutas
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Middleware de autenticación
function requireLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

// ** public **
app.use("/", express.static(path.join(__dirname, "/public")));

// ** Handlebars **
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

// ** Socket **
handleSocketConnection(io); //función de manejo de sockets

// ** Endpoints **
app.use("/api/products", requireLogin, prodRouter);
app.use("/api/carts", requireLogin, cartRouter);
app.use("/api/sessions", requireLogin, sessionsRouter);
app.use("/api/auth", authRouter);

// Rutas con vistas
app.use("/auth", authViewsRouter);
app.use("/home", requireLogin, homeViewsRouter);
app.use("/products", requireLogin, prodViewsRouter);
app.use("/carts", requireLogin, cartViewsRouter);
app.use("/chat", requireLogin, chatViewsRouter);
app.use("/realtimeproducts", requireLogin, realTimeViewsRouter);

app.use("*", (req,res) => {
  res.status(404).render("pages/404", {
    layout: "auth",
    titulo: "Oops 404",
    styles: "/styles",
  });
});
