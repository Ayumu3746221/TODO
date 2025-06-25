import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUserById } from "../getUserById.js";
import prisma from "~/prisma.js";

// prisma の user.findUnique をモック化
vi.mock("~/prisma.js", () => {
  return {
    __esModule: true,
    default: {
      user: {
        findUnique: vi.fn(),
      },
    },
  };
});

describe("getUserById", () => {
  const mockedFindUnique = prisma.user.findUnique as unknown as ReturnType<
    typeof vi.fn
  >;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return user data when user exists", async () => {
    const mockUser = { id: 1, name: "John Doe" };
    mockedFindUnique.mockResolvedValue(mockUser);

    const user = await getUserById(1);

    expect(mockedFindUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(user).toEqual(mockUser);
  });

  it("should throw an error when user does not exist", async () => {
    mockedFindUnique.mockResolvedValue(null);

    await expect(getUserById(999)).rejects.toThrow("User not found");
  });
});
