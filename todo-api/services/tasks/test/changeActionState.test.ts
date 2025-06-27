import { describe, it, expect, vi, beforeEach } from "vitest";
import { changeActionState } from "../changeActionState.js";
import prisma from "~/prisma.js";

// prisma のモック化
vi.mock("~/prisma.js", () => {
  return {
    __esModule: true,
    default: {
      task: {
        update: vi.fn(),
      },
    },
  };
});

describe("changeActionState", () => {
  const mockedUpdate = prisma.task.update as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should update isAction value correctly", async () => {
    const taskId = 1;
    const newIsAction = true;

    // モックの戻り値設定（必要に応じて）
    mockedUpdate.mockResolvedValue({ id: taskId, isAction: newIsAction });

    await changeActionState(taskId, newIsAction);

    expect(mockedUpdate).toHaveBeenCalledWith({
      where: { id: taskId },
      data: { isAction: { set: newIsAction } },
    });
  });
});
