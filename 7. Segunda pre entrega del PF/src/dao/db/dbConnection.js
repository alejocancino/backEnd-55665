import mongoose from "mongoose";

export const connectionToDB = () =>
  mongoose
    .connect(
      "mongodb+srv://alejojcancino:PPATlZpDvsijuMWD@cluster0.wbdeg56.mongodb.net/ecommerce"
    )
    .then(() => console.log("BBDD Conectada exitosamente"))
    .catch(() => console.log("Hubo un error en la conexión con la BBDD"));
