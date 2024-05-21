import userAuthStore from "./store";

const LoginStatus = () => {
  const { user, login, logout } = userAuthStore();

  if (user)
    return (
      <>
        <div>
          <span className="mx-2">{user}</span>
          <a onClick={() => logout()} href="#">
            Logout
          </a>
        </div>
      </>
    );
  return (
    <div>
      <a onClick={() => login("Slienfore Has Login!")} href="#">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
