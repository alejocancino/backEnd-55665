import Product from "./classes/product.js";
import ProductManager from "./classes/productManager.js";

const productManager = new ProductManager();

const producto1 = new Product(
  "Pelota", 
  "Cuero", 
  1500, 
  "", 
  "PC001", 
  250, 
  []
);
const producto2 = new Product(
  "Campera de cuero",
  "Cuero",
  5000,
  "",
  "CC001",
  20,
  []
);
const producto3 = new Product(
  "Escritorio de madera",
  "Madera",
  3500,
  "",
  "EM001",
  30,
  []
);
const producto4 = new Product(
  "Parlante Bluetooth",
  "Plástico",
  1000,
  "",
  "PB001",
  100,
  []
);

await productManager.initialize();

// addProduct
await productManager.addProduct(producto1);
await productManager.addProduct(producto2);
await productManager.addProduct(producto3);
await productManager.addProduct(producto4);

// Borrar
await productManager.deleteProd(2);

// Get
await productManager.getProducts();

// Update
await productManager.updateProd(3, {
  title: "Escritorio de metal",
  description: "Metal",
  price: 5500,
  thumbnail: "Muebles",
  code: "EM001",
  stock: 30,
});

setTimeout(async () => {
  await productManager.getProducts();
}, 5000);

await productManager.getProdById(2);
await productManager.getProdById(3);