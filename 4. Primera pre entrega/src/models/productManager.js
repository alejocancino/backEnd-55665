// productManager.js
import { promises as fs, constants } from "node:fs";
import { join } from "node:path";
import { __dirname } from "../path.js";

// Path decoding
const PATH = join(__dirname, "db", "products.json");

const jsonReadFile = JSON.parse(await fs.readFile(PATH), "utf-8");
const products = jsonReadFile;

class ProductManager {
  constructor() {
    this.products = [];
  }

  NextId(products) {
    let nextId = products.reduce((maxId, product) => {
      return product.id > maxId ? product.id : maxId;
    }, 0);
    return nextId + 1;
  }

  // CRUD
  // create
  async addProduct(product) {
    const validateProd = this.products.find(
      (prod) => prod.code === product.code
    );

    if (validateProd) {
      console.log("Producto ya existente, intenta agregar uno distinto");
    } else {
      product.id = this.NextId(products);
      product.push(product);
      await fs.writeFile(PATH, json.stringify(products));
    }
  }
  // update
  async updateProduct() {}
  // delete
  async deleteProduct() {}
  
  // read - readById
  async getProducts() {}
  async getProductById() {}

  
}

export default ProductManager