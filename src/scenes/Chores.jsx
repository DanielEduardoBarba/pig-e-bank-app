import { useState, useEffect } from "react"
import ChoresList from "../components/ChoresList"
import ChoresModal from "../components/ChoresModal"
import AdminModal from "../components/AdminModal"
import "./Chores.css"

export default function Chores({ account, setAccount, userID }) {
    const [markComplete, setMarkComplete] = useState("")  
    const [markForAdmin, setMarkForAdmin] = useState("")

    return (
        <>
            <div className="chores">

                <ChoresList markComplete={markComplete} setMarkComplete={setMarkComplete} setMarkForAdmin={setMarkForAdmin}/>
            </div>
            
            {
                markComplete
                    ? <ChoresModal  markComplete={markComplete} setMarkComplete={setMarkComplete} />
                    : markForAdmin
                        ? <AdminModal account={account} markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin}/>
                        : ""
            }
          
        </>
    )
}