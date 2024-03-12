import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
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

productSchema.plugin(mongoosePaginate);

export const ProductSchema = model("Product", productSchema);
