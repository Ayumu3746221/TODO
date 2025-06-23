import { Hono } from "hono";

const todoRouter = new Hono();

todoRouter.get("/", (c) => c.json("Hello from Todo API!"));

export default todoRouter;
