import { Router } from "express";

const userRouter = Router()

userRouter.get("/home", async (req, res) => {
  res.status(200).render("pages/index", {
    titulo: "Home",
  });
});
userRouter.get("/products", async (req, res) => {
  res.status(200).render("pages/products", {
    titulo: "Home",
  });
});

export {userRouter}