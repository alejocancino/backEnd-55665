import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById
} from "../controllers/products.controllers.js";

const prodRouter = Router();

prodRouter.get("/", getAllProducts);

prodRouter.get("/:id", getProductById);

prodRouter.post("/", createProduct);

prodRouter.put("/:id", updateProductById);

prodRouter.delete("/:id", deleteProductById);

export { prodRouter };