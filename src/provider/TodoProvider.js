import React, { createContext, useContext, useReducer, useEffect } from "react";
import { todoReducer, initialState } from "../hooks/useTodoReducer";

const TodoContext = createContext();

function getInitialTasks() {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : initialState.tasks;
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, {
    ...initialState,
    tasks: getInitialTasks(),
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  return useContext(TodoContext);
}
