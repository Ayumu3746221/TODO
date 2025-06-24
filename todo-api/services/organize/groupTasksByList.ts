export const groupTasksByList = (tasks: any[]) => {
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
      name: task.name,
      deadline:
        task.deadline instanceof Date
          ? task.deadline.toISOString()
          : task.deadline,
      priority: task.priority,
    });
  });

  return Array.from(listsMap.values());
};
