import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: {
      type: String,
      required: true,
  },
  description: {
      type: String,
      required: true,
  },
  thumbnail: {
    type: String,
  },
  price: {
      type: Number,
      required: true,
  },
  stock: {
      type: Number,
      required: true,
  },
  code: {
      type: String,
      required: true,
      unique: true
  },
});

export default model('product', productSchema); // Exporta directamente el modelo
