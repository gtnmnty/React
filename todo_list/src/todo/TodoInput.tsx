import { useState } from "react";
import type { SubmitEvent } from "react";
import "./css/TodoInput.css";

interface TodoInputProps {
    onAdd: (text: string) => void;
}

export default function TodoInput({ onAdd }: Readonly<TodoInputProps>) {
    const [value, setValue] = useState("");

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAdd(e.target.value)
    };

    return (
        <form className="todo-input" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input__field"
                placeholder="What needs to be done?"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                aria-label="New todo"
            />
            <button type="submit" className="todo-input__button">
                Add
            </button>
        </form>
    );
}
