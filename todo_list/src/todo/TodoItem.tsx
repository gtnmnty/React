import type { Todo } from "./TodoApp";
import "./css/TodoItem.css";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onRemove: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onRemove }: Readonly<TodoItemProps>) {
    return (
        <li className={`todo-item ${todo.completed ? "todo-item--completed" : ""}`}>
            <label className="todo-item__label">
                <input
                    type="checkbox"
                    className="todo-item__checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span className="todo-item__text">{todo.text}</span>
            </label>

            <button
                type="button"
                className="todo-item__remove"
                onClick={() => onRemove(todo.id)}
                aria-label={`Remove "${todo.text}"`}
            >
                ✕
            </button>
        </li>
    );
}
