export default class ProductManager {
  constructor() {
    this.products = [];
  }

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
}
