import { Router } from "express";
import {ProductManager} from '../../dao/db/controllers/products.controllers.js'

const homeViewsRouter = Router();
const productManager = new ProductManager();

homeViewsRouter.get("/", async (req, res) => {

  try {
    res.status(200).render("pages/home", {
      js: "/home.js",
      styles: "/styles",
      userInfo: req.session.user,
      titulo: "Home",
      error: null,
    });
  } catch (error) {
    res.status(500).render("pages/home", {
      js: "/home.js",
      styles: "/styles",
      titulo: "Home",
      error: `Hubo un error: ${error}`,
    });
  }
});
export { homeViewsRouter };