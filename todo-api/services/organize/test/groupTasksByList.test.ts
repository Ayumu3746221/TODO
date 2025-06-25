import { describe, it, expect } from "vitest";
import { groupTasksByList } from "../groupTasksByList.js";
import type { TaskWithList } from "../../../../types/Task.js";

describe("groupTasksByList", () => {
  it("should group tasks by their list", () => {
    // サンプルデータの作成
    const tasks: TaskWithList[] = [
      {
        id: 1,
        userId: 1,
        listId: 101,
        name: "Task A",
        description: "Description A",
        deadline: new Date("2025-06-30T23:59:59.000Z"),
        isAction: false,
        priority: "high",
        list: {
          id: 101,
          name: "Personal",
        },
      },
      {
        id: 2,
        userId: 1,
        listId: 101,
        name: "Task B",
        description: "Description B",
        deadline: new Date("2025-07-01T10:00:00.000Z"),
        isAction: false,
        priority: "medium",
        list: {
          id: 101,
          name: "Personal",
        },
      },
      {
        id: 3,
        userId: 1,
        listId: 102,
        name: "Task C",
        description: "Description C",
        deadline: new Date("2025-07-05T17:00:00.000Z"),
        isAction: false,
        priority: "low",
        list: {
          id: 102,
          name: "Work",
        },
      },
    ];

    // groupTasksByList を実行
    const grouped = groupTasksByList(tasks);

    // Personal リスト (id: 101) と Work リスト (id: 102) がそれぞれ存在するか検証
    expect(grouped).toHaveLength(2);

    const personalGroup = grouped.find((group) => group.id === 101);
    const workGroup = grouped.find((group) => group.id === 102);

    expect(personalGroup).toBeDefined();
    expect(workGroup).toBeDefined();

    // Personal リストには Task A と Task B が含まれるはず
    expect(personalGroup?.tasks).toHaveLength(2);
    expect(personalGroup?.tasks).toEqual([
      {
        id: 1,
        name: "Task A",
        deadline: tasks[0].deadline,
        priority: "high",
      },
      {
        id: 2,
        name: "Task B",
        deadline: tasks[1].deadline,
        priority: "medium",
      },
    ]);

    // Work リストには Task C のみが含まれる
    expect(workGroup?.tasks).toHaveLength(1);
    expect(workGroup?.tasks[0]).toEqual({
      id: 3,
      name: "Task C",
      deadline: tasks[2].deadline,
      priority: "low",
    });
  });
});
