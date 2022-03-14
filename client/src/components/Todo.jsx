import { useState, useEffect } from 'react';

function Todo(title, body) {

    const openTodo = () => {
        console.log(title, body)
    }

    return (
        <>
            <div onClick={openTodo} className="todo-item">
                
            </div>
        </>
    )
}

export default Todo
