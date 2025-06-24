import { Hono } from "hono";
import { getUnfinishedTasks } from "services/getUnfinishedTasks.js";

const todoRouter = new Hono();

todoRouter.get("/", async (c) => {
  try {
    const userId = 1; // 仮のユーザID
    const data = await getUnfinishedTasks(userId);
    return c.json(data);
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export default todoRouter;
