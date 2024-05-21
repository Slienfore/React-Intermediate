import { useLocation, useParams, useSearchParams } from "react-router-dom";

const UserDetailPage = () => {
  // Restful -> 参数
  const params = useParams();
  console.log(params);

  // Query -> 参数
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.toString());
  console.log(searchParams.get("name"), searchParams.get("age"));

  // 路由位置
  const location = useLocation();
  console.log(location);

  return <p>User</p>;
};

export default UserDetailPage;
