import { promises as fs } from "node:fs";

const PATH = "../database/productos.json";

const onProdById = (element) => {
  return element.find((prod) => prod.id === element.id);
};

export default class ProductManager {
  constructor() {
    this.products = [];
  }

  async addProduct(product) {
    const products = JSON.parse(await fs.readFile(PATH, "utf-8"));
    const prodById = products.find((prod) => prod.id === product.id);

    if (prodById) {
      console.log(`Ya existe: ${prodById.title}`);
    } else {
      products.push(product);
      await fs.writeFile(PATH, JSON.stringify(products));
    }
  }
}

/* 

  addProduct(product) {
    const findProduct = this.products.find(
      (item) => item.code === product.code
    );
    if (findProduct) {
      return console.log("Producto encontrado");
    } else {
      this.products.push(product);
      console.log(`
      Producto: * ${product.title} con el id: ${product.id} * 
      se agregó correctamente
      `);
    }
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const foundProduct = this.products.find((product) => product.id === id);

    if (foundProduct) {
      console.log("Producto encontrado:");
      console.dir(foundProduct);
    } else {
      console.log(`Producto con el id ${id} no existe`);
    }
  }

  clearProducts() {
    if (this.products.length === 0) {
      console.log("No hay productos para eliminar");
    } else {
      this.products.length = 0;
      console.log(`Productos eliminados`);
    }
  }


*/
