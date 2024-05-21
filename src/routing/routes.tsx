import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserDetail from "./UserDetail";
import Layout from "./Layout";
import UsersPage from "./UsersPage";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,

    children: [
      // index => 默认呈现组件
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
  // 私人路由 -> 不需要定义 path
  // 作为保护性路由组件, 用于包裹需要受保护的子路由
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "users",
        element: <UsersPage />,
        children: [{ path: ":id", element: <UserDetail /> }],
      },
    ],
  },
]);

export default router;
