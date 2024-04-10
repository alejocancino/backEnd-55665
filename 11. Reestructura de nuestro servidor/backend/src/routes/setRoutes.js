import {
  authRouter,
  prodRouter,
  homeViewsRouter,
  authViewsRouter,
  sessionsRouter,
} from "./index.js";

const setRoutesEndpoints = async (app, requireLogin) => {
  app.use("/api/auth", authRouter);
  app.use("/api/products",requireLogin, prodRouter);
  // app.use("/api/carts", requireLogin, cartRouter);
  app.use("/api/sessions", requireLogin, sessionsRouter);
};

const setRoutesViews = async (app, requireLogin) => {
  app.use("/auth", authViewsRouter);
  app.use("/", requireLogin, homeViewsRouter);
};

export { setRoutesEndpoints, setRoutesViews };