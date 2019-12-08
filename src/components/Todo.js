import React from 'react';
import './Todo.css'

const Todo = React.memo(function(props) {
    return (
        <li
            className={
                "todo list-group-item " +
                "list-group-item-" + (props.todo.completed ? "success" : "info")
            }
        >

            <div className="float-left">
                <input 
                    className="form-check-input"
                    type="checkbox"
                    checked={props.todo.completed}
                    onChange={_ => props.onStatusChanged(props.todo.id)}
                />

                <label className={props.todo.completed ? "completed" : ""}>
                    {props.todo.name}
                </label>
            </div>
        
            <div className="btn-group float-right" role="group">
                <button
                    className="btn btn-primary"
                    onClick={_ => props.onUpdateTodo(props.todo.id)}
                >
                    Update
                </button>

                <button
                    className="btn btn-danger"
                    onClick={_ => props.onDeleteTodo(props.todo.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
});

export default Todo;
