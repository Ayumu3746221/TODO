import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUnfinishedTasks } from "../getUnfinishedTasks.js";

// モジュールのモック化
vi.mock("../users/getUserById.js", () => ({
  getUserById: vi.fn(),
}));
vi.mock("../tasks/getUserTasks.js", () => ({
  getUserTasks: vi.fn(),
}));
vi.mock("../organize/groupTasksByList.js", () => ({
  groupTasksByList: vi.fn(),
}));

// モック化した関数のインポート
import { getUserById } from "../users/getUserById.js";
import { getUserTasks } from "../tasks/getUserTasks.js";
import { groupTasksByList } from "../organize/groupTasksByList.js";

describe("getUnfinishedTasks", () => {
  const mockGetUserById = getUserById as unknown as ReturnType<typeof vi.fn>;
  const mockGetUserTasks = getUserTasks as unknown as ReturnType<typeof vi.fn>;
  const mockGroupTasksByList = groupTasksByList as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return user and grouped lists when data exists", async () => {
    const userId = 1;
    const mockUser = { id: userId, name: "John Doe" };
    const mockTasks = [
      {
        id: 1,
        userId,
        listId: 101,
        name: "Task A",
        description: "Desc A",
        deadline: new Date("2025-06-30T23:59:59.000Z"),
        isAction: false,
        priority: "high",
        // list情報も含める（groupTasksByList の処理に必要）
        list: { id: 101, name: "Personal" },
      },
      {
        id: 2,
        userId,
        listId: 102,
        name: "Task B",
        description: "Desc B",
        deadline: new Date("2025-07-05T17:00:00.000Z"),
        isAction: false,
        priority: "medium",
        list: { id: 102, name: "Work" },
      },
    ];
    const mockGroupedLists = [
      {
        id: 101,
        name: "Personal",
        tasks: [
          {
            id: 1,
            name: "Task A",
            deadline: mockTasks[0].deadline,
            priority: "high",
          },
        ],
      },
      {
        id: 102,
        name: "Work",
        tasks: [
          {
            id: 2,
            name: "Task B",
            deadline: mockTasks[1].deadline,
            priority: "medium",
          },
        ],
      },
    ];

    // モックの戻り値設定
    mockGetUserById.mockResolvedValue(mockUser);
    mockGetUserTasks.mockResolvedValue(mockTasks);
    mockGroupTasksByList.mockReturnValue(mockGroupedLists);

    const result = await getUnfinishedTasks(userId);

    expect(mockGetUserById).toHaveBeenCalledWith(userId);
    expect(mockGetUserTasks).toHaveBeenCalledWith(userId, false);
    expect(mockGroupTasksByList).toHaveBeenCalledWith(mockTasks);
    expect(result).toEqual({ user: mockUser, lists: mockGroupedLists });
  });

  it("should return error object when an error is thrown", async () => {
    const userId = 1;
    const mockError = new Error("User not found");
    (mockError as any).status = 404;

    mockGetUserById.mockRejectedValue(mockError);

    const result = await getUnfinishedTasks(userId);

    expect(result).toEqual({ status: 404, message: "User not found" });
  });
});
