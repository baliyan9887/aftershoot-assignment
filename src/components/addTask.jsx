import React, { useState } from "react";
import { useTodoContext } from "../provider/TodoProvider";

function AddTask() {
  const { dispatch } = useTodoContext();
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Medium");

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority,
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
    setTaskText("");
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default AddTask;
