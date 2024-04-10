import { Schema, model } from "mongoose";

const cartModel = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      id_prod: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

cartModel.pre("findOne", function () {
  this.populate("products.id_prod");
});

export const CartModel = model("Cart", cartModel);
