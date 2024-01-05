const express = require("express");

const app = express();
const PORT = 8080;

const products = [
  { id: 1, nombre: "Pelota" },
  { id: 2, nombre: "Mouse" },
  { id: 3, nombre: "Teclado" },
];

app.get("/", (req, res) => {
  res.send("Hola mundo con express");
});
app.get("/bienvenida", (req, res) => {
  res.send(`
  <body style="color:blue">
    <h1>Bienvenido usuario</h1>
  </body>
  
  `);
});
app.get("/usuario", (req, res) => {
  res.send({
    nombre: "user 1",
    apellido: "apellido 1",
    edad: 22,
    correo: "mail@gmail.com",
  });
});

app.get("/products ", (req, res) => {
  res.send(products);
});
app.get("/product/:idProd", (req, res) => {
  console.log(req.params);
  const id = req.params.idProd
  const findProd = products.find(prod => prod.id == id)

  res.send(findProd)
});

app.listen(PORT, () => console.log(`Server run on port ${PORT}`));
