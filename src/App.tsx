import "./App.css";
import AuthProvider from "./state-management/auth/AuthProvider";
import HomePage from "./state-management/HomePage";
import NavBar from "./state-management/NavBar";
import { TasksProvider } from "./state-management/tasks";

function App() {
  return (
    <>
      {/* 自定义 Context Provider */}
      <AuthProvider>
        {/* 自定义 Context Provider */}
        <TasksProvider>
          <NavBar></NavBar>
          <HomePage></HomePage>
        </TasksProvider>
      </AuthProvider>
    </>
  );
}

export default App;
