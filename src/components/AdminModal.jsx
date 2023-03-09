import { useState, useEffect } from "react"
import AdminActionCenter from "./AdminActionCenter"
import AdminPin from "./AdminPin"




export default function AdminModal({ markForAdmin, setMarkForAdmin }) {
    const [error, setError] = useState("")
    const [pin, setPin] = useState(0)
    const [adminPin, setAdminPin] = useState(0)

 
   
    return (
        <>
            <div className='blurr-background' onClick={() => {
                setMarkForAdmin("")
            }} />
            <div className="AdminModal">
                <h3>{error || "ADMIN"}</h3>
                {
                pin==adminPin && adminPin
                ?<AdminActionCenter pin={pin} setError={setError} markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin}/>
                :<AdminPin setError={setError} setAdminPin={setAdminPin} pin={pin} setPin={setPin} markForAdmin={markForAdmin}/>
                }

            </div>

        </>
    )
}