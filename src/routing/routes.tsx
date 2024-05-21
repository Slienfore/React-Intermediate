import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserDetail from "./UserDetail";
import Layout from "./Layout";
import UsersPage from "./UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      // index => 默认呈现组件
      { index: true, element: <HomePage /> },

      {
        path: "users",
        element: <UsersPage />,

        // 子路由使用相对路径 -> 不需写前缀 /users
        children: [{ path: ":id", element: <UserDetail /> }],
      },
    ],
  },
]);

export default router;
