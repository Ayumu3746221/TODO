"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Plus } from "lucide-react"

interface TodoFormProps {
    onAddTodo: (text: string) => void
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = () => {
        if (inputValue.trim() !== "") {
            onAddTodo(inputValue.trim())
            setInputValue("")
        }
    }

    // const handleKeyDown = (e: React.KeyboardEvent) => {
    //     if (e.key === "Enter") {
    //         handleSubmit()
    //     }
    // }

    return (
        <div className="flex gap-2">
            <Input
                type="text"
                placeholder="新しいタスクを入力..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                // onKeyDown={handleKeyDown}
                className="flex-1"
            />
            <Button onClick={handleSubmit} size="icon">
                <Plus className="h-4 w-4" />
                <span className="sr-only">タスクの追加</span>
            </Button>
        </div>
    )
}