import { useState } from "react";
import { useDispatch } from 'react-redux';
import { createTodo } from '../features/todo/todoSlice';

function TodoForm() {
  const [todoData, setTodoData] = useState({
    title: "",
    body: "",
  });

  const dispatch = useDispatch();

  const { title, body } = todoData;

  const onSubmit = event => {
      event.preventDefault();

      dispatch(createTodo({title, body}));
      setTodoData({});
  }

  const onChange = event => {
      setTodoData((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value
      }));
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          placeholder="Title"
          className="form-control"
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="body"
          id="body"
          value={body}
          placeholder="Body"
          className="form-control"
          onChange={onChange}
          required
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-dark">
          Create
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
