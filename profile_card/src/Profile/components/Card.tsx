import { skills, type ProfileCardProps } from "../../data/info";
import { Skills } from "./Skills.tsx";


export function Card({ avatar, full_name, role, bio}: Readonly<ProfileCardProps>) {
    return (
        <div className="card">
            <img className="avatar" src={avatar} alt="Avatar of Alex Rivera"/>
            <div className="name">{full_name}</div>
            <div className="role">{role}</div>
            <p className="bio">{bio}</p>
            <Skills items={skills}/>
        </div>
    )
}