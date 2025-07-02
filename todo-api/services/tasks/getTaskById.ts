import type { Task } from "@prisma/client";
import prisma from "~/prisma.js";

export const getTaskById = async (taskId: number): Promise<Task> => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  if (!task) {
    const error = new Error(`Task with ID ${taskId} not found`);
    (error as any).status = 404;
    throw error;
  }

  return task;
};
