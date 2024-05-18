import React from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10; // just make it const

  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePosts({ pageSize });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <ul className="list-group">
        {/* 
            无限查询的数据是按 "页" 进行组织的, 每一页的数据都是一个数组 【Array(length), Array(length)】
            渲染时: 遍历每一页数据, 再遍历每一页中的具体内容
         */}
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>

      <button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        className="btn btn-primary my-3 ms-1"
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostList;
