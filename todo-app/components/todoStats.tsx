"use client"

interface TodoStatsProps {
    totalCount: number
    completedCount: number
}

export function TodoStats({totalCount, completedCount}: TodoStatsProps) {
    if (totalCount === 0) {
        return null
    }

    return (
        <div className="text-center text-sm text-muted-foreground">
            <span>
                {completedCount} / {totalCount} 完了
            </span>
        </div>
    )
}