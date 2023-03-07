import { useState, useEffect } from "react"
import AccountInfo from "../components/AccountInfo"

import ChoresList from "../components/ChoresList"
import ChoresModal from "../components/ChoresModal"
import "./Chores.css"

export default function Checking({ userID }) {
    const [markComplete, setMarkComplete] = useState("")
    const [balance, setBalance] = useState(0)
    

    return (
        <>
            <div className="chores">

                {/* <AccountInfo balance={balance}/> */}

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