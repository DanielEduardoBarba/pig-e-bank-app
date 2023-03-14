import { useEffect, useState } from "react"
import AddCredit from "./AddCredit"
import AdminPin from "./AdminPin"

export default function AddCreditModal({ account, setModal, userID, childID }) {

    const [error, setError] = useState("")
    const [pin, setPin] = useState(0)
    const [adminPin, setAdminPin] = useState(0)
    const [markForAdmin, setMarkForAdmin] = useState("")

    useEffect(() => {
        setMarkForAdmin({ userID, childID })
    }, [])
    return (
        <>
            <div className='blurr-background' onClick={() => {
                setModal(0)
            }} />

            <div className="AdminModal">

                <h3>{error || "Add Credit"}</h3>

                {
                    pin == adminPin && adminPin
                        ? <AddCredit account={account} pin={pin} setError={setError} setModal={setModal} />
                        : <AdminPin setError={setError} setAdminPin={setAdminPin} pin={pin} setPin={setPin} markForAdmin={markForAdmin} />
                }

            </div>
        </>
    )
}