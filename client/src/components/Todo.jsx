import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../features/todo/todoSlice';
import CloseIcon from '@mui/icons-material/Close';

function Todo({ todo }) {
    const dispatch = useDispatch();

    const openTodo = (event) => {
        console.log(todo)
    }

    const removeTodo = (event) => {
        event.stopPropagation();
        dispatch(deleteTodo(todo._id))
    }

    return (
        <>
            <div onClick={openTodo} className="todo-item">
                <div className='todo-content'>
                    <h2>{todo.title}</h2>
                    <p>{todo.body}</p>
                </div>
                <CloseIcon onClick={removeTodo} />
            </div>
        </>
    )
}

export default Todo;
