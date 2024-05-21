import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserDetailPage from "./UserDetailPage";
import UserListPage from "./UserListPage";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      // index => 默认呈现组件
      { index: true, element: <HomePage /> },

      { path: "users", element: <UserListPage /> },
      { path: "users/:id", element: <UserDetailPage /> },
    ],
    
  },
]);

export default router;
