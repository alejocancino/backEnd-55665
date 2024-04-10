import { Router } from "express";
import {
  userLogin,
  passportAuth,
  passportGithub,
  passportGithubCallback,
  userLogout,
} from "../controllers/user.controllers.js";

const authRouter = Router();

authRouter.post("/login", userLogin);
authRouter.post("/register", passportAuth);
authRouter.get("/github", passportGithub);
authRouter.get("/GithubCallback", passportGithubCallback);
authRouter.get("/logout", userLogout);

export { authRouter };
