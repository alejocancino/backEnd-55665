import { Router } from "express";
import { UserManager } from "../../dao/db/controllers/user.controllers.js";
import { createHash, validatePassword } from "../../utils/bcrypt.js";
import passport from "passport";

const authRouter = Router();
const userManager = new UserManager();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userManager.getUserByEmail(email);
    if (user) {
      console.log(email, password);

      if (!validatePassword(user, password)) {
        return res.status(401).send({ error: "Credenciales incorrectas" });
      }
      req.session.user = user;
      return res.status(200).redirect("/auth/profile");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

authRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/auth/register-failed",
  }),
  async (req, res) => {
    try {
      return res.status(200).redirect("/products");
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

authRouter.get(
  "/github",
  passport.authenticate("github", { scope: [ 'user:email' ] }),
  async (req, res) => {}
);

authRouter.get(
  "/GithubCallback",
  passport.authenticate("github", {}),
  async (req, res) => {
    req.session.user = req.user;
    return res.status(200).redirect("/home");
  }
);

authRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).json({ error: "Error al cerrar sesión" });
    } else {
      return res.status(200).redirect("/auth/login");
    }
  });
});

export { authRouter };
