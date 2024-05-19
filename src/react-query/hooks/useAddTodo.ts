import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constant";
import todoService, { type Todo } from "../services/todo-service";

// todoMutation 上下文类型限制
interface AddTodoContext {
  previousTodos: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  // 获取当前应用程序中的 QueryClient实例， 进行Query缓存管理
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: todoService.post,
    // Before Executing the mutation === unMutate callback
    onMutate(newTodo: Todo) {
      // 保存更新前数据, 方便失败回退
      const previousTodos =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);

      onAdd(); // 传入的回调

      return { previousTodos }; // return 上下文(context)
    },
    // 失败则 回退 之前保存的上下文
    onError(error, newTodo, context) {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, context?.previousTodos);
    },
    // res => 返回的结果 | newTodo => 请求的参数
    onSuccess(res, newTodo) {
      queryClient.setQueryData<Todo[]>(
        CACHE_KEY_TODOS,
        // 请求成功后: 将原先添加进入的进行替换
        (todos) => todos?.map((todo) => (todo === newTodo ? res : todo))
      );
    },
  });
};

export default useAddTodo;
