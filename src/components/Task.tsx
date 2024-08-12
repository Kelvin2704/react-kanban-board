import { useDraggable } from "@dnd-kit/core"

interface TaskProps {
    id: string
    title: string
}
const Task: React.FC<TaskProps> = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
        id
    })
    const style = {
        transform: transform ? `translate3d(${transform.x}px,${transform.y}px,0)` : undefined,
        opacity: isDragging ? 0.5 : 1
    }
    return (
        <div ref={setNodeRef} {...listeners} {...attributes} style={style} className="bg-gray-100 p-4 rounded-lg shadow focus:border-red-500 border">
            {title}
        </div>
    )
}

export default Task