import { Router } from "express";
import { getUserById } from "../services/user.services.js";

const sessionsRouter = Router();

sessionsRouter.get("/current", async (req, res) => {
  const uId = req.session.user._id;
  try {
    const user = await getUserById(uId);
    console.log(user);
    const { password, ...userWithoutPass } = user.toObject();
    
    res.status(200).json(userWithoutPass);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
});

export { sessionsRouter };