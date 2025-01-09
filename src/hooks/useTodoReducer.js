const initialState = {
  tasks: [],
  undoStack: [],
  redoStack: [],
  filter: "All",
};

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        undoStack: [
          ...state.undoStack,
          { type: "REMOVE_TASK", payload: action.payload },
        ],
        redoStack: [],
      };

    case "REMOVE_TASK":
      const remainingTasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      return {
        ...state,
        tasks: remainingTasks,
        undoStack: [
          ...state.undoStack,
          { type: "ADD_TASK", payload: action.payload },
        ],
        redoStack: [],
      };

    case "EDIT_TASK":
      const editedTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, text: action.payload.text }
          : task
      );
      return {
        ...state,
        tasks: editedTasks,
        undoStack: [
          ...state.undoStack,
          {
            type: "EDIT_TASK",
            payload: {
              id: action.payload.id,
              text: state.tasks.find((t) => t.id === action.payload.id).text,
            },
          },
        ],
        redoStack: [],
      };

    case "TOGGLE_TASK":
      const toggledTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );
      return {
        ...state,
        tasks: toggledTasks,
        undoStack: [
          ...state.undoStack,
          { type: "TOGGLE_TASK", payload: action.payload },
        ],
        redoStack: [],
      };

    case "UNDO":
      if (state.undoStack.length === 0) return state;
      const lastUndoAction = state.undoStack[state.undoStack.length - 1];
      return {
        ...todoReducer(state, lastUndoAction),
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [...state.redoStack, lastUndoAction],
      };

    case "REDO":
      if (state.redoStack.length === 0) return state;
      const lastRedoAction = state.redoStack[state.redoStack.length - 1];
      return {
        ...todoReducer(state, lastRedoAction),
        undoStack: [...state.undoStack, lastRedoAction],
        redoStack: state.redoStack.slice(0, -1),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

export { initialState, todoReducer };
