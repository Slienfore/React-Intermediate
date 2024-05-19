import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodo";
import axios from "axios";

const TodoForm = () => {
  // 获取当前应用程序中的 QueryClient实例， 进行Query缓存管理
  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn(todo: Todo) {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
    // res => 返回的结果 | todo => 请求的参数
    onSuccess(res, todo) {
      // Updating the data in the cache
      queryClient.setQueryData<Todo[]>(
        ["todos"],

        (todos) => [res, ...(todos || [])]
      );

      // 添加成功后, 清除搜索框
      if (ref.current) ref.current.value = "";
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current?.value) {
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
          }
        }}
        className="row mb-3"
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">
            {addTodo.isLoading ? "loading..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
