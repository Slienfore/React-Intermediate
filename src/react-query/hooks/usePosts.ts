import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { all } from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = (query: PostQuery) =>
  useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * query.pageSize, // 分页查询, 每一页最多有多少条发表笔记
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1 * 60 * 1000, // expired in 1 minute
    keepPreviousData: true, // 为避免新数据加载时显示loading空白闪烁状态, React Query将会保持和显示当前的旧数据

    getNextPageParam: (lastPage, allPages) => {
      // allPages: 存储的是, 进行分页查询的每次数据 -> allPages[ Array(10), Array(10) ]
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });

export default usePosts;
