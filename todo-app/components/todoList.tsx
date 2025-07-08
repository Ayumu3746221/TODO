"use client"
import type { Todo } from "../types/todo"

interface TodoListProps {
    todos: Todo[]
    onToggleTodo: (id: number) => void
    onDeleteTodo: (id: number) => void
}

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
    if (todos.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">タスクがありません。新しいタスクを追加してください。</div>
        )
    }
}