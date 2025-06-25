import type { Task, NormalizedTask } from "../../../types/Task.js";

export const normalizeTask = (task: Task): NormalizedTask => {
  return {
    id: task.id,
    name: task.name,
    deadline: task.deadline,
    priority: task.priority,
  };
};
