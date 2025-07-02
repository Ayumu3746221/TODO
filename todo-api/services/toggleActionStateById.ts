import { getTaskById } from "./tasks/getTaskById.js";
import { changeActionState } from "./tasks/changeActionState.js";

export const toggleActionStateById = async (taskId: number) => {
  try {
    const task = await getTaskById(taskId);
    const newIsAction = !task.isAction;
    await changeActionState(taskId, newIsAction);
    return { taskId, isAction: newIsAction };
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
