import express from "express";
import cors from "cors";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from "passport";
import cookieParser from "cookie-parser";
import { initPassport } from "../config/passport.js";

export const initializeGlobalsMiddlewares = (app) => {
  app.use(cors());
  app.use(
    session({
      store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL,
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

  // Middleware para manejo de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo se rompió en el config.middleware");
  });
};
