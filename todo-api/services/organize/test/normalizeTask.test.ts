import { describe, it, expect } from "vitest";
import { normalizeTask } from "../normalizeTask.js";
import type { Task, NormalizedTask } from "../../../../types/Task.js";

describe("normalizeTask", () => {
  it("should return normalized task", () => {
    // サンプルの Task 型のデータを作成
    const sampleTask: Task = {
      id: 1,
      userId: 1,
      listId: 101,
      name: "Test Task",
      description: "This is a test task",
      deadline: new Date("2025-06-30T23:59:59.000Z"),
      isAction: false,
      priority: "high",
    };

    // normalizeTask を呼び出して結果を取得
    const normalized: NormalizedTask = normalizeTask(sampleTask);

    // 期待されるNormalizedTaskの値
    const expected: NormalizedTask = {
      id: sampleTask.id,
      name: sampleTask.name,
      deadline: sampleTask.deadline,
      priority: sampleTask.priority,
    };

    // 結果が期待通りであることを検証
    expect(normalized).toEqual(expected);
  });
});
