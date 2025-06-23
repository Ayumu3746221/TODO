export type Priority = "high" | "medium" | "low";

export interface Task {
  id: number;
  user_id: number;
  list_id: number;
  name: string;
  description: string;
  deadline: Date;
  isAction: boolean;
  priority: Priority;
}
