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
    console.error("Error retrieving tasks:", error);
    throw error;
  }
};
