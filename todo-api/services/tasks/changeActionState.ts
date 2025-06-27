import prisma from "~/prisma.js";

export const changeActionState = async (taskId: number, isAction: boolean) => {
  prisma.task.update({
    where: { id: taskId },
    data: {
      isAction: {
        set: isAction,
      },
    },
  });
};
