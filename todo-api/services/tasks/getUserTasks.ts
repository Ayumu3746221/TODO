import prisma from "~/prisma.js";

export const getUserTasks = async (userId: number, isAction: boolean) => {
  return await prisma.task.findMany({
    where: {
      userId,
      isAction: isAction,
    },
    include: { list: true },
  });
};
