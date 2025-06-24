import prisma from "~/prisma.js";

export const getUnfinishedTasks = async (userId: number) => {
  try {
    // ユーザ情報の取得
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }

    // 未完了タスクの取得（リスト情報も含む）
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        isAction: false,
      },
      include: { list: true },
    });

    // リストごとにタスクをグループ化
    const listsMap = new Map<
      number,
      { id: number; name: string; tasks: any[] }
    >();
    tasks.forEach((task) => {
      const list = task.list;
      if (!listsMap.has(list.id)) {
        listsMap.set(list.id, { id: list.id, name: list.name, tasks: [] });
      }
      listsMap.get(list.id)?.tasks.push({
        id: task.id,
        list_id: list.id,
        name: task.name,
        deadline:
          task.deadline instanceof Date
            ? task.deadline.toISOString()
            : task.deadline,
        priority: task.priority,
        ...(task.description && { description: task.description }),
      });
    });

    const lists = Array.from(listsMap.values());

    return {
      user,
      lists,
    };
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    throw error;
  }
};
