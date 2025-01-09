import React, { useState } from "react";
import { useTodoContext } from "../provider/TodoProvider";
import Controls from "./controls";

function Task({ task }) {
  const { dispatch } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      dispatch({
        type: "EDIT_TASK",
        payload: {
          id: task.id,
          text: editText,
          prevTask: task,
        },
      });
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className={`task ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEdit();
              }
            }}
          />
        </div>
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>
          {task.text} {task.priority}
        </span>
      )}

      {!task.completed && <Controls task={task} />}
    </li>
  );
}

export default React.memo(Task);
