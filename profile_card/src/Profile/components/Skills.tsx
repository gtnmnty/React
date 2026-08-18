import {type SkillsProps } from "../../data/info"

export function Skills({ items }: SkillsProps) {

    return (
        <ul className="skills">
            {items.map((skill) => (
                <li key={skill}>{skill}</li>
            ))}
        </ul>
    );
}