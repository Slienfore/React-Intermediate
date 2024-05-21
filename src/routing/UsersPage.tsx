import { Navigate, Outlet } from "react-router-dom";
import UserList from "./UserList";
import useAuth from "./hooks/useAuth";

const UsersPage = () => {
  const { user } = useAuth();

  // Navigate -> 是使用 useNavigate hook 进行的组件封装, 进行路由跳转
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="row">
      <div className="col">
        <UserList></UserList>
      </div>
      <div className="col">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UsersPage;
