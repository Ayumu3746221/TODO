type Priority = "high" | "medium" | "low";

export interface Task {
  id: number;
  userId: number;
  listId: number;
  name: string;
  description: string;
  deadline: Date;
  isAction: boolean;
  priority: Priority;
}

export type NormalizedTask = Omit<
  Task,
  "userId" | "listId" | "description" | "isAction"
>;

export interface TaskWithList extends Task {
  list: {
    id: number;
    name: string;
  };
}
