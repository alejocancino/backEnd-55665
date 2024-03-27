import { Schema, model } from "mongoose";
import { CartManager } from "../controllers/cart.controller.js";
const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart" 
    }
  },
  {
    timestamps: true,
    strict: false,
  }
);

userSchema.pre('save', async function(next) {
  if (!this.cart) {
    try {
      const cartManager = new CartManager()
      const newCart = await cartManager.createCart(); 
      this.cart = newCart._id; 
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export const UserSchema = model("User", userSchema);