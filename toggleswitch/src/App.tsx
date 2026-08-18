import {useState} from 'react'
import './App.css'
import * as React from "react";

function App() {
    const [theme, setTheme] = useState('light');

    const isDark = theme === 'dark';

    const cycleTheme = () => {
        setTheme(prev => {
            const next = prev === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            return next;
        });

    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if(e.key == "Enter") e.preventDefault();
        cycleTheme();
    }

    const icon = isDark ? '🌙' : '☀️';
    const title = isDark ? 'Dark Mode' : 'Light Mode';
    const subtitle = isDark
        ? 'Easier at night, less glare'
        : 'Easy on the eyes, bright and clean';

    return (
        <div className="card" data-theme={isDark ? 'dark' : 'light'}>
            <div className="icon" id="icon">{icon}</div>
            <div className="title" id="title">{title}</div>
            <div className="subtitle" id="subtitle">{subtitle}</div>
            <div className="switch" id="switch" role="switch" aria-checked={isDark} tabIndex={0}
                 onClick={cycleTheme} onKeyDown={handleKeyDown}>
                <div className="knob"></div>
            </div>
        </div>
    )
}

export default App
