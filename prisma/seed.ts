import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: { name: "John Doe" },
  });

  const listPersonal = await prisma.list.create({
    data: {
      userId: user.id,
      name: "Personal",
    },
  });

  await prisma.task.create({
    data: {
      userId: user.id,
      listId: listPersonal.id,
      name: "Buy groceries",
      description: "Milk, bread, eggs",
      deadline: new Date("2025-06-30T23:59:59.000Z"),
      isAction: false,
      priority: "high",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
