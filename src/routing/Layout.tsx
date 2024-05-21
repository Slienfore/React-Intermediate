import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />

      <div id="main">
        {/* 不同的路由组件将会呈现在这里 */}
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Layout;
