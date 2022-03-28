import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, resetTodos } from "../../features/todo/todoSlice";
import Todo from "../../components/Todo";
import Spinner from '../../components/Spinner';

function Landing() {
  const dispatch = useDispatch();

  const { todos, isLoading, message } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodos());
    dispatch(resetTodos());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />
  }

  //add unique key

  if (todos) {
    return (
      <div className="todos-container">
        {todos.map((todo) => (
          <Todo key={todo.id} title={todo.title} body={todo.body} />
        ))}
      </div>
    );
  }

  return <div className="todos-container"></div>;
}

export default Landing;
