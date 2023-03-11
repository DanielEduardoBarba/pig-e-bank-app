import { useState, useEffect } from "react"
import ChoresList from "../components/ChoresList"
import MarkChoresModal from "../components/MarkChoresModal"
import AdminModal from "../components/AdminModal"
import ChoresModal from "../components/ChoresModal"
import "./Chores.css"

export default function Chores({ account, setAccount, userID }) {
    const [markComplete, setMarkComplete] = useState("")  
    const [markForAdmin, setMarkForAdmin] = useState("")
    const [modal,setModal] = useState(0)

    return (
        <>
            <div className="chores">

                <ChoresList modal={modal} setModal={setModal}  markComplete={markComplete} setMarkComplete={setMarkComplete} markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin}/>
            </div>
            
            {   
                modal
                    ? <ChoresModal  account={account} setModal={setModal}/>
                    : markComplete
                        ? <MarkChoresModal  markComplete={markComplete} setMarkComplete={setMarkComplete} />
                        : markForAdmin 
                            ? <AdminModal account={account} markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin}/>
                            :""
            }
          
        </>
    )
}