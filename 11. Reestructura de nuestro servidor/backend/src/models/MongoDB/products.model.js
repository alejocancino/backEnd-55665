import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Desarrollo de automatizaciones",
      "Desarrollo de WebApps",
      "Consultoría de procesos",
    ],
    index: true,
  },
  includes: {
    type: [],
  },
  thumbnail: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

productModel.plugin(mongoosePaginate);

export const ProductModel = model("Product", productModel);
