# Summarize of handleDragEnd

## In the handleDragEnd event of the Kanban board:

**1. Identify the Source and Target:**

- Determine the column (activeColumn) from which the task is being dragged.
- Identify the column (overColumn) where the task is being dropped.

**2. Reorder Tasks within the Same Column:**

- If the task is dropped in the same column, reorder the tasks by moving the dragged task to its new position using arrayMove.

**3. Move Task Between Columns:**

- If the task is dropped into a different column:
- Remove the task from the source column (activeColumn).
- Insert the task into the target column (overColumn) at the appropriate position.

**4. Update State:**

- Update the state to reflect the new positions of the tasks and columns.
  "# react-kanban-board"
