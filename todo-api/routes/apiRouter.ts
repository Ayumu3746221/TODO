import { Hono } from "hono";
import todoRouter from "./todo/route.js";

const apiRouter = new Hono();

apiRouter.route("/todo", todoRouter);

export default apiRouter;