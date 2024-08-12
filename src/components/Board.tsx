import { useState } from "react"
import Column from "./Column"
import { closestCenter, DndContext } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"

interface Task {
  id: string;
  title: string;
}
interface ColumnData {
  id: string;
  title: string;
  tasks: Task[];
}
const Board: React.FC<ColumnData> = () => {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 'task-1', title: 'Task 1' },
        { id: 'task-2', title: 'Task 2' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', title: 'Task 3' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 'task-4', title: 'Task 4' },
      ],
    },
  ])

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    // console.log(active, over)

    if (!over) return

    //Find in columns which task.id === taskId (para) => return boolean
    const findColumnByTaskId = (taskId: string) => {
      return columns.find((column) => column.tasks.some((task) => task.id === taskId))
    }
    const findColumnById = (columnId: string) => {
      return columns.find(column => column.id === columnId)
    }

    const updateColumnTasks = (columnId: string, newTasks: Task[]) => {
      setColumns((prevColumns) => prevColumns.map((column) => column.id === columnId ? { ...column, tasks: newTasks } : column))
    }

    const activeColumn = findColumnByTaskId(active.id)
    const overColumn = findColumnById(over.id)
    // console.log(activeColumn, overColumn);


    if (!activeColumn || !overColumn) return;

    //if same column
    if (activeColumn.id === overColumn.id) {
      //reordering within the same column
      const oldIndex = activeColumn.tasks.findIndex(task => task.id === active.id)
      const newIndex = activeColumn.tasks.findIndex(task => task.id === over.id)
      // console.log(oldIndex, newIndex)

      if (oldIndex !== newIndex) {
        const newTasks = arrayMove(activeColumn.tasks, oldIndex, newIndex)
        console.log(newTasks);
        updateColumnTasks(activeColumn.id, newTasks)
      }
    } else {
      //if differenct column
      const taskToMove = activeColumn.tasks.find(task => task.id === active.id)
      console.log(taskToMove)
      if (!taskToMove) return;

      //Remove task from the old active column
      const newActiveColumnTasks = activeColumn.tasks.filter(task => task.id !== active.id);
      updateColumnTasks(activeColumn.id, newActiveColumnTasks)

      //Add task to new column 
      const newOverColumnTasks = [...overColumn.tasks];
      newOverColumnTasks.splice(overColumn.tasks.findIndex(task => task.id === over.id), 0, taskToMove);
      updateColumnTasks(overColumn.id, newOverColumnTasks)
    }

  }
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 p-4">
        <SortableContext items={columns} strategy={verticalListSortingStrategy}>
          {columns.map((column) => (
            <Column key={column.id} id={column.id} title={column.title} tasks={column.tasks} />
          ))}
        </SortableContext>
      </div>
    </DndContext >
  )
}

export default Board