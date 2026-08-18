import {Card} from "./components/Card.tsx";
import { info } from "../data/info.tsx";
import "./Profile.css"

export function Profile () {
    return (
        <Card {...info }/>
    )
}