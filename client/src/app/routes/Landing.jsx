import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTodos, resetTodos } from "../../features/todo/todoSlice";
import Todo from "../../components/Todo";
import TodoForm from "../../components/TodoForm";
import Spinner from "../../components/Spinner";

function Landing() {
  const [showTodoForm, setShowTodoForm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading, message } = useSelector((state) => state.todos);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getTodos());

    return () => {
      dispatch(resetTodos());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="create-todo-form">
        <button
          onClick={() => setShowTodoForm(!showTodoForm)}
          className={"btn " + (showTodoForm ? "btn-danger" : "btn-success")}
        >
          {showTodoForm ? "Close" : "Create Todo"}
        </button>
      </div>

      {showTodoForm ? (
        <div className="todo-form">
          <TodoForm />
        </div>
      ) : null}

      <div className="todos-container">
        {todos.length > 0 ? (
          todos.map((todo) => <Todo key={todo._id} todo={todo} />)
        ) : (
          <h5 style={{ width: "100%" }}>No todos to display</h5>
        )}
      </div>
    </>
  );
}

export default Landing;
