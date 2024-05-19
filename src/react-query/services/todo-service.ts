import APIClient from "./api-clicent";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export default new APIClient<Todo>("/todos"); // 实例化
