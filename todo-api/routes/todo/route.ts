import { Hono } from "hono";
import { STATUS_CODES } from "http";
import { getUnfinishedTasks } from "services/getUnfinishedTasks.js";
import { getTaskById } from "services/tasks/getTaskById.js";
import { toggleActionStateById } from "services/toggleActionStateById.js";

const todoRouter = new Hono();

todoRouter.get("/:userId", async (c) => {
  const userId = Number(c.req.param("userId"));
  const response = await getUnfinishedTasks(userId);
  if (response.status && response.message) {
    return c.json({ error: response.message }, response.status);
  }
  return c.json({
    status: STATUS_CODES.OK,
    message: "Unfinished tasks retrieved successfully",
    user: response.user,
    lists: response.lists,
  });
});

todoRouter.patch("/:taskId", async (c) => {
  const taskId = Number(c.req.param("taskId"));
  const response = await toggleActionStateById(taskId);
  if (response.status && response.message) {
    return c.json({ error: response.message }, response.status);
  }
  return c.json({
    status: STATUS_CODES.OK,
    message: "Action state toggled successfully",
    taskId: response.taskId,
    isAction: response.isAction,
  });
});

export default todoRouter;
