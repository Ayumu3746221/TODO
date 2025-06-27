import { describe, it, expect, beforeEach, vi } from "vitest";
import { getTaskById } from "../getTaskById.js";
import prisma from "~/prisma.js";

// prisma のモック定義
vi.mock("~/prisma.js", () => {
  return {
    __esModule: true,
    default: {
      task: {
        findUnique: vi.fn(),
      },
    },
  };
});

describe("getTaskById", () => {
  const mockedFindUnique = prisma.task.findUnique as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return task when found", async () => {
    // テスト用のタスクデータ（@prisma/client の Task 型に準拠）
    const mockTask = {
      id: 1,
      userId: 1,
      listId: 101,
      name: "Test Task",
      description: "This is a test task",
      deadline: new Date("2025-06-30T23:59:59.000Z"),
      isAction: false,
      priority: "high",
    };

    mockedFindUnique.mockResolvedValue(mockTask);

    const task = await getTaskById(1);

    expect(mockedFindUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(task).toEqual(mockTask);
  });

  it("should throw error when task is not found", async () => {
    mockedFindUnique.mockResolvedValue(null);

    // エラーを投げるシナリオ
    await expect(getTaskById(999)).rejects.toThrow(
      "Task with ID 999 not found"
    );

    try {
      await getTaskById(999);
    } catch (error: any) {
      expect(error.status).toBe(404);
    }
  });
});
