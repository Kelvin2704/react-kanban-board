import { useDroppable } from "@dnd-kit/core"
import Task from "./Task"
import { useState } from "react"

import Button from "./Button"
import AddTaskModal from "./AddTaskModal"
import ColumnModal from "./ColumnModal"
import EditTaskModal from "./EditTaskModal"
import { FaRegEdit } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"


interface TaskProps {
    id: string;
    title: string;
    description: string;
    image: string | null;
    tags: string[];
}
interface ColumnProps {
    id: string
    title: string
    tasks: { id: string, title: string, description: string, tags: string[], image: string | null }[]
    onTitleChange: (newTitle: string) => void
    onAddTask: (task: TaskProps) => void
    onDelete: () => void
    onEditTask: (task: TaskProps) => void;
    onDeleteTask: (taskId: string, columnId: string) => void
}
const Column: React.FC<ColumnProps> = ({ id, title, tasks, onAddTask, onTitleChange, onDelete, onEditTask, onDeleteTask }) => {
    const { setNodeRef } = useDroppable({
        id
    });
    const [columnTitle, setColumnTitle] = useState(title);
    const [titleBgColor, setTitleBgColor] = useState('#f3f4f6 '); // Default color
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [isEditColumnModalOpen, setIsEditColumnModalOpen] = useState(false);

    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);



    const handleSaveColumnChanges = (newTitle: string, newBgColor: string) => {
        setColumnTitle(newTitle);  // Update the column title
        setTitleBgColor(newBgColor); // Update the title background color
        onTitleChange(newTitle);  // Notify parent component of the title change if necessary
    };

    const handleAddTask = (task: { title: string; description: string; image: string | null; tags: string[] }) => {
        const newTask: TaskProps = {
            id: `task-${Date.now()}`, // Generate a unique ID for the task
            title: task.title,
            description: task.description,
            image: task.image,
            tags: task.tags,
        };

        onAddTask(newTask); // Call the onAddTask prop to add the task to the column
    };

    const handleEditTask = (task: TaskProps) => {
        setSelectedTask(task);
        setIsEditTaskModalOpen(true);
    };
    const handleDeleteTask = (taskId: string) => {
        onDeleteTask(taskId, id)
    }

    const handleSaveTaskChanges = (updatedTask: TaskProps) => {
        onEditTask(updatedTask); // Pass the updated task to the parent component
        setIsEditTaskModalOpen(false);
    };

    return (
        <div className="w-72 animate-fadeInUp">
            <div className="space-y-3 pb-4 bg-white shadow rounded-md min-h-32">
                <div className="flex justify-between items-center p-2 gap-1 rounded-t-md border-b border-gray-200">
                    <div className="p-2 flex gap-1 items-center  w-full rounded font-semibold">
                       <div className="size-3 rounded-full " style={{backgroundColor:titleBgColor}}></div> {title}
                    </div>
                    <button onClick={() => setIsEditColumnModalOpen(true)} className="ml-2 p-1 text-gray-500">
                        <FaRegEdit className="hover:text-gray-800 text-gray-400 size-5 transition-colors" />
                    </button>
                </div>
                <div ref={setNodeRef} className="space-y-2 px-4">
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            tags={task.tags}
                            image={task.image}
                            onClickEdit={() => handleEditTask(task)} // Handle edit button click
                            onDelete={() => handleDeleteTask(task.id)}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-5 p-2 outline-1 outline-offset-1 outline-gray-300 rounded outline-dashed flex justify-center bg-gray-100/50">
                <button className="flex justify-center items-center gap-1 text-gray-900 w-full " onClick={() => setIsAddTaskModalOpen(true)}> <FaPlus /> Add Task</button>
            </div>

            <AddTaskModal
                isOpen={isAddTaskModalOpen}
                onClose={() => setIsAddTaskModalOpen(false)}
                onSave={handleAddTask} // handleAddTask now passes full task details
            />

            <ColumnModal
                isOpen={isEditColumnModalOpen}
                onClose={() => setIsEditColumnModalOpen(false)} onSave={handleSaveColumnChanges} title={columnTitle} bgColor={titleBgColor} onDelete={onDelete} />

            {selectedTask && (
                <EditTaskModal
                    isOpen={isEditTaskModalOpen}
                    onClose={() => setIsEditTaskModalOpen(false)}
                    onSave={handleSaveTaskChanges}
                    task={selectedTask}
                />
            )}

        </div>
    )
}

export default Column