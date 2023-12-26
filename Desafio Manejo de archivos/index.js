import Product from "./classes/product.js";
import ProductManager from "./classes/productManager.js";

const productManager = new ProductManager()

const producto1 = new Product("Pelota", "Cuero", 1500, "", "PC001", 100, []);

productManager.addProduct(producto1);
