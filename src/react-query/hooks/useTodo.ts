import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-clicent";
import { CACHE_KEY_TODOS } from "../constant";
import todoService, { type Todo } from "../services/todo-service";

const useTodos = () => {
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: todoService.getAll,
    staleTime: 10_000,
  });
};

export default useTodos;
