import { describe, it, expect, vi, beforeEach } from "vitest";
import { toggleActionStateById } from "../toggleActionStateById.js";
import { getTaskById } from "../tasks/getTaskById.js";
import { changeActionState } from "../tasks/changeActionState.js";

// 依存関数をモック化
vi.mock("../tasks/getTaskById.js", () => ({
  getTaskById: vi.fn(),
}));
vi.mock("../tasks/changeActionState.js", () => ({
  changeActionState: vi.fn(),
}));

describe("toggleActionStateById", () => {
  const mockGetTaskById = getTaskById as unknown as ReturnType<typeof vi.fn>;
  const mockChangeActionState = changeActionState as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should toggle isAction and return updated info when task is found", async () => {
    // モックのタスクデータを用意（isAction が false の場合）
    const mockTask = {
      id: 1,
      isAction: false,
      // 他のプロパティは省略（toggle の判定に必要なのは isAction と id）
    };
    // getTaskById が正常にタスクを返すよう設定
    mockGetTaskById.mockResolvedValue(mockTask);
    // changeActionState は resolve する（戻り値は利用しないので空オブジェクトでOK）
    mockChangeActionState.mockResolvedValue({});

    const result = await toggleActionStateById(1);

    // isAction が false から true に変わるはず
    expect(result).toEqual({ taskId: 1, isAction: true });
    expect(mockGetTaskById).toHaveBeenCalledWith(1);
    expect(mockChangeActionState).toHaveBeenCalledWith(1, true);
  });

  it("should return error response when getTaskById throws error", async () => {
    // エラーオブジェクト（status付き）を用意
    const mockError = new Error("Task with ID 999 not found");
    (mockError as any).status = 404;
    // getTaskById がエラーを投げるシナリオ
    mockGetTaskById.mockRejectedValue(mockError);

    const result = await toggleActionStateById(999);

    expect(result).toEqual({
      status: 404,
      message: "Task with ID 999 not found",
    });
    expect(mockGetTaskById).toHaveBeenCalledWith(999);
  });
});
