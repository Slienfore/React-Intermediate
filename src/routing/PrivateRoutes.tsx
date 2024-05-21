import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const PrivateRoutes = () => {
  const { user } = useAuth();

  // Navigate -> 是使用 useNavigate hook 进行的组件封装, 进行路由跳转
  if (!user) return <Navigate to="/login" />;

  return <Outlet></Outlet>;
};

export default PrivateRoutes;
