/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

const filters = {
    ALL: 'ALL',
    COMPLETE: 'COMPLETE',
    INCOMPLETE: 'INCOMPLETE'
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            newTodo: 'Learn Python',
            editing: false,
            index: null,
            filter: filters.ALL,
            todos: [
                {
                    id: 0,
                    name: 'Learn React',
                    completed: false
                },
                {
                    id: 1,
                    name: 'Learn Vue',
                    completed: false
                },
                {
                    id: 2,
                    name: 'Learn Angular',
                    completed: false
                }
            ]
        }

        this.allRef = React.createRef()
    }

    handleChange = (e) => {
        this.setState({
            newTodo: e.target.value
        })
    }

    addTodo = () => {
        const newTodo = {
            id: this.state.todos.length,
            name: this.state.newTodo,
            completed: false
        }

        const todos = this.state.todos.concat(newTodo)
        this.setState({
            todos,
            newTodo: ''
        })
    }

    deleteTodo = (id) => {
        const todos = this.state.todos.filter(todo => todo.id !== id)
        this.setState({
            todos,
            editing: false,
            newTodo: '',
            index: null
        })
    }

    updateTodo = (id) => {
        const index = this.findTodoIndexById(id)
        if (index !== -1) {
            const todo = this.state.todos[index]

            this.setState({
                editing: true,
                newTodo: todo.name,
                index
            })
        }
    }

    modifyTodo = () => {
        const todo = {...this.state.todos[this.state.index]}
        todo.name = this.state.newTodo

        const todos = [...this.state.todos]
        todos[this.state.index] = todo
        this.setState({
            todos,
            editing: false,
            newTodo: '',
            index: null
        })
    }

    changeStatus = (id) => {
        const index = this.findTodoIndexById(id)
        if (index !== -1) {
            const todo = {...this.state.todos[index]}
            todo.completed = !todo.completed

            const todos = [...this.state.todos]
            todos[index] = todo
            this.setState({
                todos
            })
        }
    }

    findTodoIndexById = (id) => this.state.todos.findIndex(todo => todo.id === id)

    viewAll = () => {
        this.setState({
            filter: filters.ALL
        })
    }

    viewComplete = () => {
        this.setState({
            filter: filters.COMPLETE
        })
    }

    viewIncomplete = () => {
        this.setState({
            filter: filters.INCOMPLETE
        })
    }

    render() {
        const filter = this.state.filter;
        const filteredTodos = this.state.todos.filter(todo => {
            if (filter === filters.COMPLETE) return todo.completed;
            if (filter === filters.INCOMPLETE) return !todo.completed;
            return true;
        });
        return (
            <div className="App">
                <div className="container">
                    <h1 className="text-center mt-3">Todo App</h1>
                    <TodoForm
                        newTodo={this.state.newTodo}
                        editing={this.state.editing}
                        handleChange={this.handleChange}
                        onModifyTodo={this.modifyTodo}
                        onAddTodo={this.addTodo}
                    />

                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-pills card-header-pills">
                                <li className="nav-item">
                                    <a 
                                        href="#"
                                        className={"nav-link " + (this.state.filter === filters.ALL && "active")}
                                        onClick={this.viewAll}
                                    >
                                        All
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        href="#"
                                        className={"nav-link " + (this.state.filter === filters.COMPLETE && "active")}
                                        onClick={this.viewComplete}
                                    >
                                            Complete
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a 
                                        href="#"
                                        className={"nav-link " + (this.state.filter === filters.INCOMPLETE && "active")}
                                        onClick={this.viewIncomplete}
                                    >
                                        Incomplete
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="card-body">
                            <TodoList 
                                todos={filteredTodos}
                                onUpdateTodo={this.updateTodo}
                                onDeleteTodo={this.deleteTodo}
                                onStatusChanged={this.changeStatus}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
