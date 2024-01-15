import { Router } from "express";

import {ProductManager} from "../models/index.js";

export const prodRouter = Router();
const productManager = new ProductManager();


prodRouter.get("/", async (req, res) => {
  res.send("<h1>Todos los productos</h1>");
});

prodRouter.get("/:id", async (req, res) => {
  const {id} = req.params
  res.send( `<h1>Productos por id:${id}</h1>` );
});

prodRouter.post("/", async (req, res) => {
  const validate = await productManager.addProduct(req.body);

  if (validate) {
    res.status(200).send("Producto creado correctamente");
    return;
  } else {
    res.status(400).send("Error en crear producto");
  }
});

prodRouter.put("/:id", async (req, res) => {
  const {id} = req.params
  res.send( `<h1>Productos por id:${id}</h1>` );
});

prodRouter.delete("/:id", async (req, res) => {
  const {id} = req.params
  res.send( `<h1>Productos por id:${id}</h1>` );
});

export default prodRouter