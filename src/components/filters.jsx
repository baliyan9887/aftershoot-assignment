import React from "react";
import { useTodoContext } from "../provider/TodoProvider";

function Filters() {
  const { dispatch } = useTodoContext();

  return (
    <div>
      <button onClick={() => dispatch({ type: "SET_FILTER", payload: "All" })}>
        All
      </button>
      <button
        onClick={() => dispatch({ type: "SET_FILTER", payload: "Completed" })}
      >
        Completed
      </button>
      <button
        onClick={() => dispatch({ type: "SET_FILTER", payload: "Pending" })}
      >
        Pending
      </button>
    </div>
  );
}

export default Filters;
