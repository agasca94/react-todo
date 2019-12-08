import React from 'react';
import Todo from './Todo';

class TodoList extends React.PureComponent {
    render() {
        return (
            <ul className="list-group">
                {this.props.todos.map(item => 
                    <Todo
                        key={item.id}
                        todo={item}
                        onUpdateTodo={this.props.onUpdateTodo}
                        onDeleteTodo={this.props.onDeleteTodo}
                        onStatusChanged={this.props.onStatusChanged}
                    />
                )}
            </ul>
        );
    }
}

export default TodoList;
