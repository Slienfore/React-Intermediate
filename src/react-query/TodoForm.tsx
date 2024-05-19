import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodo";
import axios from "axios";

// todoMutation 上下文类型限制
interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  // 获取当前应用程序中的 QueryClient实例， 进行Query缓存管理
  const queryClient = useQueryClient();

  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn(todo: Todo) {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
    // Before Executing the mutation === unMutate callback
    onMutate(newTodo: Todo) {
      // 保存更新前数据, 方便失败回退
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        // 先更新视图
        newTodo,
        ...(todos || []),
      ]);

      if (ref.current) ref.current.value = ""; // 清除搜索框

      return { previousTodos }; // return 上下文(context)
    },
    // 失败则 回退 之前保存的上下文
    onError(error, newTodo, context) {
      queryClient.setQueryData<Todo[]>(["todos"], context?.previousTodos);
    },
    // res => 返回的结果 | newTodo => 请求的参数
    onSuccess(res, newTodo) {
      queryClient.setQueryData<Todo[]>(
        ["todos"],
        // 请求成功后: 将原先添加进入的进行替换
        (todos) => todos?.map((todo) => (todo === newTodo ? res : todo))
      );
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
