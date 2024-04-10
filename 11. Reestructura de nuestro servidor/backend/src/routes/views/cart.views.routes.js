import { Router } from "express";

const cartViewsRouter = Router();

cartViewsRouter.get("/:cid", async (req, res) => {
 

    res.status(200).render("pages/carts", {
      js: "/cart.js",
      styles: "/styles",
      titulo: "Cart",
      error: null,
    });
  
});

export { cartViewsRouter };
