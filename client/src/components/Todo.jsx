import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Todo(props) {
    const { title, body } = props;

    const openTodo = () => {
        console.log(props)
    }

    const deleteTodo = (event) => {
        event.stopPropagation();
    }

    return (
        <>
            <div onClick={openTodo} className="todo-item">
                <div className='todo-content'>
                    <h2>{title}</h2>
                    <p>{body}</p>
                </div>
                <CloseIcon onClick={deleteTodo} />
            </div>
        </>
    )
}

export default Todo
