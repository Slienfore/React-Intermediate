import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // retry times
      cacheTime: 300_000, // cache expired time -> 5 minutes = (((300,000) / 1000) / 60)
      staleTime: 10_000, // the time of the data is fresh -> 10s
      // refetch data -> (如果缓存中数据是旧的, 那么Query将会向服务器请求新的数据, 然后替换组件中的数据, 且更新缓存中的数据)
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* 让路由根据路由规则, 决定呈现的是哪一个组件 */}
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
