import { useDraggable } from "@dnd-kit/core"
import { FaEdit, FaGripLines, FaRegEdit, FaTrash } from "react-icons/fa";
import Button from "./Button";

interface TaskProps {
    id: string
    title: string
    description: string
    image: string | null;
    tags: string[];
    onClickEdit: () => void; // Function to handle edit click
    onDelete: () => void
}


const Task: React.FC<TaskProps> = ({ id, title, description, tags, image, onClickEdit, onDelete }) => {
    const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
        id
    })
    const style = {
        transform: transform ? `translate3d(${transform.x}px,${transform.y}px,0) scale(${isDragging ? 1.15 : 1})` : undefined,
        transition: isDragging ? 'transform 0.1s ease' : 'transform 0.1s ease, scale 0.1s ease',
        opacity: isDragging && 1,
        zIndex: isDragging ? 1000 : 'auto',

    }

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent drag events from triggering
        onClickEdit();
    };

    const handleDeleteTask = (e: React.MouseEvent) => {
        e.stopPropagation();
        const confirmDelete = window.confirm("Are you sure that you want to delete this task?");
        if (confirmDelete) {
            onDelete();
        }
    }
    return (

        <div ref={setNodeRef} style={style} className="flex flex-col bg-amber-50 p-4 space-y-3 rounded-lg shadow-md border border-dashed bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80">
            <div {...listeners} {...attributes} className="cursor-grab flex justify-end">
                <FaGripLines />
            </div>
            <h1 className="text-xl font-semibold capitalize">
                {title}
            </h1>
            <p className="text-gray-500 line-clamp-3">{description}</p>
            <img src={image} alt="" className="w-full rounded shadow" />
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span key={index} className="rounded bg-amber-200 p-2 font-semibold" >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex space-x-2 justify-end">
                <button onClick={handleEditClick} className="text-gray-400">
                    <FaRegEdit />
                </button>
                <button onClick={handleDeleteTask} className="text-gray-400">
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default Task