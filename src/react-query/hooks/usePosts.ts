import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = (userId: number | undefined) =>
  useQuery<Post[], Error>({
    // queryKey: 由静态和动态组成 -> "users","posts" 是静态, userId 是动态
    // 用于唯一标识特定查询, 能够区分和管理不同的请求
    // 如果 userId 发生变化, 那么将会重新刷新, 类似 useEffect 的 dependence
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            userId,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, // expired in 1 minute
  });

export default usePosts;
