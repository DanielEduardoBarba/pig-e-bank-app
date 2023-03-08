import { useState, useEffect } from "react"
import ChoresList from "../components/ChoresList"
import ChoresModal from "../components/ChoresModal"
import "./Chores.css"

export default function Checking({ userID }) {
    const [markComplete, setMarkComplete] = useState("")  

    return (
        <>
            <div className="chores">

                <ChoresList markComplete={markComplete} setMarkComplete={setMarkComplete}/>
            </div>
            
            {
                markComplete
                    ? <ChoresModal  markComplete={markComplete} setMarkComplete={setMarkComplete}/>
                    : ""
            }
        </>
    )
}