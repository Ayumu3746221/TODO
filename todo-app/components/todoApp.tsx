"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./../components/ui/card";
import { Todo } from "../types/todo";
import { TodoStats } from "./todoStats";
import { TodoForm } from "./todoForm";

export default function todoApp() {
    const [todos, setTodos] = useState<Todo[]>([])

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false,
        }
        setTodos([...todos, newTodo])
    }

    const toggleTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const completedCount = todos.filter((todo) => todo.completed).length
    const totalCount = todos.length

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">Todoアプリ</CardTitle>
                        <TodoStats totalCount={totalCount} completedCount={completedCount} />   
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <TodoForm onAddTodo={addTodo} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}