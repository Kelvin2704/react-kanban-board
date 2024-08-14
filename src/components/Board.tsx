import { useState } from "react"
import Column from "./Column"
import { closestCenter, DndContext } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Button from "./Button";

interface Task {
  id: string;
  title: string;
  description: string;
  image: string | null;
  tags: string[];
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
        { id: 'task-1', title: 'Kanban Board Project', description: "This is a description of this task", image: null, tags: ['Dndkit', 'Typscript'] },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      tasks: [

      ],
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [

      ],
    },
  ])

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    // console.log(active, over)

    if (!over) return

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

  const addColumn = () => {
    const newColumn: ColumnData = {
      id: `column-${columns.length + 1}`,
      title: `New Column`,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId: string) => {
    setColumns((prevColumns) => prevColumns.filter(column => column.id !== columnId))
  }

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

  const updateColumnTitle = (columnId: string, newTitle: string) => {
    setColumns((prevColumns) => prevColumns.map((column) => column.id === columnId ? { ...column, title: newTitle } : column))
  }

  const addTaskToColumn = (columnId: string, task: { title: string; description: string; image: string | null; tags: string[] }) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: task.title,
      description: task.description,
      image: task.image,
      tags: task.tags,
    }
    setColumns((prevColumns) => prevColumns.map((column) => column.id === columnId ? { ...column, tasks: [...column.tasks, newTask] } : column))
  }

  const handleEditTask = (updatedTask: Task) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.tasks.some((task) => task.id === updatedTask.id)
          ? {
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            ),
          }
          : column
      )
    );
  };

  const deleteTask = (taskId: string, columnId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          : column
      )
    );
  };


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex space-x-4 p-4 z-0">
        <SortableContext items={columns} strategy={verticalListSortingStrategy}>
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
              onTitleChange={(newTitle) => updateColumnTitle(column.id, newTitle)}
              onAddTask={(task) => addTaskToColumn(column.id, task)}
              onDelete={() => deleteColumn(column.id)}
              onEditTask={handleEditTask} // Pass down the edit handler
              onDeleteTask={deleteTask}
            />
          ))}
        </SortableContext>
        <Button
          onClick={addColumn}
          className="h-full bg-blue-500 hover:bg-blue-400 text-gray-100">
          Add New column
        </Button>
      </div>
    </DndContext >
  )
}

export default Board