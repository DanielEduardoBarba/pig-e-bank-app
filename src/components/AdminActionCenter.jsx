import { useEffect } from "react"
import { API_URL } from "../URLs"

let enteredPin = 0

export default function AdminActionCenter({ markForAdmin, setMarkForAdmin, setError, pin }) {

    useEffect(()=>{
        document.getElementById("title").value=markForAdmin.title
        document.getElementById("amount").value=markForAdmin.amount

        markForAdmin.action=""
        setMarkForAdmin(markForAdmin)
    },[])
     
    const submitWithPin = (e) => {

        e.preventDefault()

        fetch(`${API_URL}/findpin/${markForAdmin.userID}/${markForAdmin.childID}`)
            .then(incoming => incoming.json())
            .then(response => {
                if (response[0].childID == markForAdmin.childID &&
                    response[0].userID == markForAdmin.userID &&
                    markForAdmin.action &&
                    response[0].adminPin == pin) {

                    //REMOVE TRANSACTION routing
                    if(markForAdmin.action=="remove") fetch(`${API_URL}/transactions`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(markForAdmin)
                    })
                        .then(incoming => incoming.json())
                        .then(response => {
                            console.log(response)
                            if (markForAdmin.action=="remove" && response.serverStatus == 34) {
                                document.getElementById("admin-form").reset()
                                setMarkForAdmin("")
                            }
                            else alert(response.serverStatus)
                        })
                        .catch(console.error)
                //APPROVE TRANSACTION
                    if(markForAdmin.action=="approve") fetch(`${API_URL}/transactions`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(markForAdmin)
                    })
                        .then(incoming => incoming.json())
                        .then(response => {
                            console.log(response)
                            if (markForAdmin.action=="approve" && response.serverStatus == 34) {
                                document.getElementById("admin-form").reset()
                                setMarkForAdmin("")
                            }
                            else alert(response.serverStatus)
                        })
                        .catch(console.error)
                }
                else {
                    setError("Admin Pin Not Valid!")
                }
            })
            .catch(console.error)
    }


    return (
        <>
            <form id="admin-form" className="admin-form" onSubmit={e => submitWithPin(e)}>
                <p>Transaction: {markForAdmin.transID}</p>
                <label>Title</label>
                <input name="title" id="title" placeholder="title"
                    onChange={e => {
                        markForAdmin.title = e.target.value
                        setMarkForAdmin(markForAdmin)
                    }} />

                <label>Amount</label>
                <input name="amount" id="amount" placeholder="amount"
                    onChange={e => {
                        markForAdmin.amount = e.target.value
                        setMarkForAdmin(markForAdmin)
                    }} />

                <select name="action" id="action" onChange={e => {
                    if (e.target.value == "") markForAdmin.action = ""
                    if (e.target.value == "approve"){
                        markForAdmin.isPending = "false"
                        markForAdmin.action = "approve"
                    }
                    if (e.target.value == "remove") markForAdmin.action = "remove"
                    setMarkForAdmin(markForAdmin)
                }}>
                    <option value="">Select Action</option>
                    <option value="approve">Approve</option>
                    <option value="remove">Remove</option>
                </select>

                <button style={{ backgroundColor: "red" }}>Run Action</button>
            </form>
        </>
    )
}