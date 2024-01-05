import express from "express";
import ProductManager from "./classes/productManager.js";

const PORT = 4000;
const app = express();

const productManager = new ProductManager();

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();
  if (!limit) {
    res.send(products);
  } else {
    const limitToInt = parseInt(limit);

    if (!isNaN(limitToInt) && limitToInt > 0) {
      const limitedProds = products.slice(0, limitToInt);
      res.send(limitedProds);
    } else {
      res.send({
        error: "Se ingresó mal el query param, tipo de dato incorrecto",
      });
    }
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;

  const product = await productManager.getProdById(parseInt(pid));

  if (!product) {
    res.send({ error: "El producto solicitado no se encuentra" });
  } else {
    res.send(
      `<body>
          <div>
            <ul>
              <li>
                <label>Id</label>  
                ${product.id}
              </li>
              <li>
              <label>Title</label>  
                ${product.title}
              </li>
              <li>
              <label>Description</label>  
                ${product.description}
              </li>
              <li>
              <label>Price</label>  
                $ ${product.price}
              </li>
              <li>
              <label>Code</label>  
                ${product.code}
              </li>
              <li>
              <label>Stock</label>  
                ${product.stock}
              </li>
            </ul>
          </div>
      </body>`
    );
  }
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
