import { useRef } from "react";
import useAddTodo from "./hooks/useAddTodo";

const TodoForm = () => {
  const addTodo = useAddTodo(() => {
    if (ref.current) ref.current.value = "";
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
