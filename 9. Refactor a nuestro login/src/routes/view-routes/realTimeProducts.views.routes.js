import { Router } from "express";

const realTimeViewsRouter = Router();

realTimeViewsRouter.get("/", (req, res) => {
  res.status(200).render("pages/realTimeProds", {
    js: "/realTimeProducts.js",
    styles: "/styles",
    titulo: "Listado de productos",
    error: null,
  });
});

export {realTimeViewsRouter}