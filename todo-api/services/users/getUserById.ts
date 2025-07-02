import prisma from "~/prisma.js";

export const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    const error = new Error(`User with ID ${userId} not found`);
    (error as any).status = 404;
    throw error;
  }
  return user;
};
