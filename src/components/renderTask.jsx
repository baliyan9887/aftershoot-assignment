import React from "react";
import Task from "./task";
import { useTodoContext } from "../provider/TodoProvider";
function TaskList() {
  const { state } = useTodoContext();

  const filteredTasks = state.tasks
    .filter((task) => {
      if (state.filter === "All") return true;
      if (state.filter === "Completed") return task.completed;
      if (state.filter === "Pending") return !task.completed;
      return true;
    })
    .sort((a, b) => {
      const priorities = { High: 1, Medium: 2, Low: 3 };
      return priorities[a.priority] - priorities[b.priority];
    });

  return (
    <ul>
      {filteredTasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
