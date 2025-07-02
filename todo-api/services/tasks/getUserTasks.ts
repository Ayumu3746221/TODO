import { error } from "console";
import prisma from "~/prisma.js";

export const getUserTasks = async (userId: number, isAction: boolean) => {
  const tasks = await prisma.task.findMany({
    where: {
      userId,
      isAction: isAction,
    },
    include: { list: true },
  });

  if (!tasks) {
    const error = new Error("No tasks found for the user");
    (error as any).status = 404;
    throw error;
  }

  return tasks;
};
