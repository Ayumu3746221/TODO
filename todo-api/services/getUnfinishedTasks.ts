import { getUserById } from "./users/getUserById.js";
import { getUserTasks } from "./tasks/getUserTasks.js";
import { groupTasksByList } from "./organize/groupTasksByList.js";

export const getUnfinishedTasks = async (userId: number) => {
  try {
    const user = await getUserById(userId);
    const tasks = await getUserTasks(userId, false);
    const lists = groupTasksByList(tasks);

    return { user, lists };
  } catch (error) {
    const status =
      error instanceof Error && (error as any).status
        ? (error as any).status
        : 500;
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return { status, message };
  }
};
