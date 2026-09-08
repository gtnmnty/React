import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import "./TodoApp.css";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAdd = (text: string) => {
        setTodos(text)
    };

    // const handleToggle = (id: string) => {
    //     setTodos(todos.map(todo => {
    //         todo.id === id ? { ...todo, completed: !todo.completed } : todo
    //     }))
    // };

    // const handleRemove = (id: string) => {
    //     setTodos()
    // };

    return (
        <div className="todo-app">
            <header className="todo-app__header">
                <h1 className="todo-app__title">Todo List</h1>
                <p className="todo-app__subtitle">
                    {todos.length} {todos.length === 1 ? "task" : "tasks"}
                </p>
            </header>

            <TodoInput onAdd={handleAdd} />

            <TodoList todos={todos} onToggle={handleToggle} onRemove={handleRemove} />
        </div>
    );
}
