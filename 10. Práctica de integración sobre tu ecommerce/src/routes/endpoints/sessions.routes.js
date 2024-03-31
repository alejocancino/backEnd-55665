import { Router } from "express";
import { UserManager } from "../../dao/db/controllers/user.controllers.js";

const sessionsRouter = Router();
const userManager = new UserManager();

sessionsRouter.get("/current", async (req, res) => {
  const uId = req.session.user._id;
  try {
    const user = await userManager.getUserById(uId);

    const { password, ...userWithoutPass } = user.toObject();

    res.status(200).json(userWithoutPass);
  } catch (error) {
    console.error("Error al fetchear al user:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

export { sessionsRouter };
