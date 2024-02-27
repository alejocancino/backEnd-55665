import { Router } from "express";
import { CartManager } from "../../dao/db/controllers/cart.controller.js";

const cartRouter = Router();
const cartManager = new CartManager();

// Crear carrito
cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(200).json(newCart);
  } catch (error) {
    console.error("Error al crear carrito:", error);
    res.status(500).send("Error interno al crear carrito");
  }
});

// Eliminar carrito
cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    await cartManager.deleteCart(parseInt(cid));
    
    localStorage.setItem("cartId", newCart._id);

    res.status(200).send("Carrito eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar carrito:", error);
    res.status(500).send("Error interno al eliminar carrito");
  }
});

// Solicitar carrito por ID
cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartManager.getCartById(parseInt(cid));
    if (!cart) {
      res.status(404).send(`El carrito con ID ${cid} no se encontró`);
    } else {
      res.status(200).send(cart);
    }
  } catch (error) {
    console.error("Error al buscar carrito:", error);
    res.status(500).send("Error interno al buscar carrito");
  }
});

// Agregar productos al carrito
cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartManager.addProductToCart(cid, pid, quantity); // No parsear a entero
    res.status(200).send(`Producto con ID ${pid} agregado al carrito con ID ${cid}`);
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).send("Error interno al agregar producto al carrito");
  }
});

// Eliminar producto del carrito
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartManager.removeProductFromCart(parseInt(cid), parseInt(pid));
    res
      .status(200)
      .send(`Producto con ID ${pid} eliminado del carrito con ID ${cid}`);
  } catch (error) {
    console.error("Error al eliminar producto del carrito:", error);
    res.status(500).send("Error interno al eliminar producto del carrito");
  }
});

// Actualizar cantidad de un producto en el carrito
cartRouter.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartManager.updateProductQuantity(
      parseInt(cid),
      parseInt(pid),
      quantity
    );
    res
      .status(200)
      .send(
        `Cantidad del producto con ID ${pid} en el carrito con ID ${cid} actualizada`
      );
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito:",
      error
    );
    res
      .status(500)
      .send(
        "Error interno al actualizar la cantidad del producto en el carrito"
      );
  }
});

export { cartRouter };
