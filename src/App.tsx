import { useReducer } from "react";
import "./App.css";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import TasksContext from "./state-management/contexts/tasksContext";
import tasksReducer from "./state-management/reducers/tasksReducer";

function App() {
  // 将这个Reducer传入到Context进行集中管理, 通过 useContext 进行组件通信
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  return (
    <>
      {/* share this two object in a component tree */}
      {/* TasksContext like a truck transporting this "Reducer" box */}
      {/* access this box anywhere in our component tree -> using context hook*/}
      <TasksContext.Provider value={{ tasks, dispatch }}>
        <NavBar></NavBar>
        <HomePage></HomePage>
      </TasksContext.Provider>
    </>
  );
}

export default App;
