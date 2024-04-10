import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../services/user.services.js";
import passport from "passport";
import { validatePassword } from "../utils/bcrypt.js";

export const newUser = async (req, res) => {
  const userData = req.body;
  try {
    const user = await createUser(userData);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await getUserByEmail(email);
    if (findUser) {
      console.log(email, password);

      if (!validatePassword(findUser, password)) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
      }
      req.session.user = findUser;
      return res.status(200).redirect("/auth/profile");

    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const passportAuth = async (req, res) => {
  try {
    passport.authenticate("register", {
      failureRedirect: "/auth/register-failed",
    })(req, res, () => {
      res.status(200).json({message:"registrado"})
      // res.status(200).redirect("/products");
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const passportGithub = async (req, res) => {
  passport.authenticate("github", { scope: ["user:email"] }),
    async (req, res) => {};
};

export const passportGithubCallback = async (req, res) => {
  passport.authenticate("github", {}),
    async (req, res) => {
      req.session.user = req.user;
      return res.status(200).redirect("/home");
    };
};

export const userLogout = async (req,res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
      return res.status(500).json({ error: "Error al cerrar sesión" });
    } else {
      return res.status(200).redirect("/auth/login");
    }
  });
};
