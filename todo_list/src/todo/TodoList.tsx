import type { Todo } from "./TodoApp";
import TodoItem from "./TodoItem";
import "./css/TodoList.css";

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onRemove }: Readonly<TodoListProps>) {
    if (todos.length === 0) {
        return (
            <div className="todo-list todo-list--empty">
                <p className="todo-list__empty-message">
                    No todos yet — add one above to get started.
                </p>
            </div>
        );
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onRemove={onRemove}
                />
            ))}
        </ul>
    );
}
