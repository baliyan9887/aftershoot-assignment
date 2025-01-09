import React from "react";
import { useTodoContext } from "../provider/TodoProvider";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { LiaUndoAltSolid, LiaRedoAltSolid } from "react-icons/lia";
function Controls({ task }) {
  const { dispatch, state } = useTodoContext();

  const toggleTask = () => dispatch({ type: "TOGGLE_TASK", payload: task });
  const removeTask = () => dispatch({ type: "REMOVE_TASK", payload: task });

  const handleUndo = () => dispatch({ type: "UNDO" });
  const handleRedo = () => dispatch({ type: "REDO" });

  return (
    <div className="controls">
      <button onClick={removeTask}>
        <MdDeleteOutline />
      </button>
      <button onClick={toggleTask}>
        <MdDone />
      </button>
      <button onClick={handleUndo} disabled={state.undoStack.length === 0}>
        <LiaUndoAltSolid />
      </button>
      <button onClick={handleRedo} disabled={state.redoStack.length === 0}>
        <LiaRedoAltSolid />
      </button>
    </div>
  );
}

export default Controls;
