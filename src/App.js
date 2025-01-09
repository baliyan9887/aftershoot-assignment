import "./App.css";
import AddTask from "./components/addTask";
import Filters from "./components/filters";
import RenderTasks from "./components/renderTask";
import { TodoProvider } from "./provider/TodoProvider";

function App() {
  return (
    <TodoProvider>
      <div className="App">
        <header className="App-header">
          <Filters />
          <AddTask />
          <RenderTasks />
        </header>
      </div>
    </TodoProvider>
  );
}

export default App;
