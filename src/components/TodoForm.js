import React from 'react';

const TodoForm = React.memo(function(props) {
    return (
        <div>
            <input
                type="text"
                name="todo"
                className="form-control mb-3"
                placeholder="Add a new Todo"
                onChange={props.handleChange}
                value={props.newTodo}
            />
            <button
                disabled={props.newTodo.length < 1}
                onClick={props.editing ? props.onModifyTodo : props.onAddTodo}
                className="btn btn-info mb-3 form-control"
            >
                { props.editing ? 'Update todo' : 'Add todo' }
            </button>
        </div>
    );
});

export default TodoForm;
