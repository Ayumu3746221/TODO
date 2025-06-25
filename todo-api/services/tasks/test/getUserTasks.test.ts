import { describe, it, expect, beforeEach, vi } from "vitest";
import { getUserTasks } from "../getUserTasks.js";
import prisma from "~/prisma.js";

// prisma をモック化
vi.mock("~/prisma.js", () => {
  return {
    default: {
      task: {
        findMany: vi.fn(),
      },
    },
  };
});

describe("getUserTasks", () => {
  // モック化した findMany を参照
  const mockedFindMany = prisma.task.findMany as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return tasks for given userId and isAction flag", async () => {
    // テスト用のモックデータ
    const mockTasks = [
      {
        id: 1,
        userId: 1,
        listId: 101,
        name: "Task 1",
        description: "Desc 1",
        deadline: new Date("2025-06-30T23:59:59.000Z"),
        isAction: false,
        priority: "high",
        list: { id: 101, name: "Personal" },
      },
      {
        id: 2,
        userId: 1,
        listId: 102,
        name: "Task 2",
        description: "Desc 2",
        deadline: new Date("2025-07-05T17:00:00.000Z"),
        isAction: false,
        priority: "medium",
        list: { id: 102, name: "Work" },
      },
    ];

    // モックの戻り値設定
    mockedFindMany.mockResolvedValue(mockTasks);

    // 関数実行
    const result = await getUserTasks(1, false);

    // prisma.task.findMany が期待した引数で呼ばれていることを検証
    expect(mockedFindMany).toHaveBeenCalledWith({
      where: { userId: 1, isAction: false },
      include: { list: true },
    });
    // 結果がモック値と一致するか検証
    expect(result).toEqual(mockTasks);
  });
});
