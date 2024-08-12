import { useDroppable } from "@dnd-kit/core"
import Task from "./Task"

interface ColumnProps {
    id: string
    title: string
    tasks: { id: string, title: string }[]
}
const Column: React.FC<ColumnProps> = ({ id, title, tasks }) => {
    const { setNodeRef } = useDroppable({
        id
    })

    return (
        <div className="w-64 p-4 bg-gray-50 shadow rounded-md">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <div ref={setNodeRef} className="space-y-2">
                {tasks.map((task) => (
                    <Task key={task.id} id={task.id} title={task.title} />
                ))}
            </div>
        </div>
    )
}

export default Column