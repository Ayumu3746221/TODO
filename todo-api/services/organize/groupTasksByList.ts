import type { TaskWithList } from "../../../types/Task.js";
import { normalizeTask } from "./normalizeTask.js";

export const groupTasksByList = (tasks: Array<TaskWithList>) => {
  const listsMap = new Map<
    number,
    {
      id: number;
      name: string;
      tasks: Array<{
        id: number;
        name: string;
        deadline: Date | string | null;
        priority: "high" | "medium" | "low";
      }>;
    }
  >();

  tasks.forEach((task) => {
    const listId = task.list.id;
    if (!listsMap.has(listId)) {
      listsMap.set(listId, { id: listId, name: task.list.name, tasks: [] });
    }
    listsMap.get(listId)?.tasks.push({
      ...normalizeTask(task),
    });
  });

  return Array.from(listsMap.values());
};
