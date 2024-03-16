import { ProductManager } from "../dao/db/controllers/products.controllers.js";
import { MessageManager } from "../dao/db/controllers/chat.controller.js";

export function handleSocketConnection(io) {
  const productManager = new ProductManager();
  const messageManager = new MessageManager();

  io.on("connection", (socket) => {
    console.log("socket conectado");
    
    //* CHAT
    socket.on("loadChats", async () => {
      try {
        const messages = await messageManager.getMessages();
        socket.emit("showMessages", messages);
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    });

    socket.on("newMessage", async (data) => {
      try {
        const newMessage = await messageManager.newMessage(data);
        io.emit("newMessage", newMessage);
      } catch (error) {
        console.error("Error al guardar el mensaje:", error);
      }
    });

    //* RealTimeProducts
    socket.on("getProducts", async () => {
      try {
        const products = await productManager.getProducts({});
        console.log(products);
        socket.emit("prodsData", products);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    });

    socket.on("newProduct", async (data) => {
      try {
        const newProduct = await productManager.createProduct(data);
        io.emit("newProduct", newProduct);
      } catch (error) {
        console.error("Error al guardar el producto:", error);
      }
    });

    socket.on("removeProduct", async (productId) => {
      try {
        await productManager.deleteProduct(productId);
        io.emit("productRemoved", productId);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    });
  });
}