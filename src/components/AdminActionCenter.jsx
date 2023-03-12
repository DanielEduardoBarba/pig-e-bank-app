import { useEffect, useContext } from "react"
import { API_URL } from "../URLs"
import { UserProvider } from "../App"

let enteredPin = 0

export default function AdminActionCenter({ account, markForAdmin, setMarkForAdmin, setError, pin }) {

    const { userID, childID } = useContext(UserProvider)

    useEffect(() => {
        document.getElementById("title").value = markForAdmin.title
        document.getElementById("amount").value = markForAdmin.amount

        markForAdmin.action = ""
        setMarkForAdmin(markForAdmin)
        console.log("ADMIN CENTER ACCOUNT: ",account)
    }, [])

    const submitWithPin = (e) => {

        e.preventDefault()

        fetch(`${API_URL}/findpin/${markForAdmin.userID}/${markForAdmin.childID}`)
            .then(incoming => incoming.json())
            .then(response => {
                if (response[0].childID == markForAdmin.childID &&
                    response[0].userID == markForAdmin.userID &&
                    markForAdmin.action &&
                    response[0].adminPin == pin) {
                    let routing = ""
                    if (account == "checking" || account == "savings" || account == "credit") routing = "transactions"
                    if (account == "chores") routing = "chores"

                    //REMOVE routing
                    if (markForAdmin.action == "remove") fetch(`${API_URL}/${routing}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(markForAdmin)
                    })
                        .then(incoming => incoming.json())
                        .then(response => {
                            console.log(response)
                            if (markForAdmin.action == "remove" && response.serverStatus == 34) {
                                document.getElementById("admin-form").reset()
                                setMarkForAdmin("")
                            }
                            else alert(response.serverStatus)
                        })
                        .catch(console.error)

                    //APPROVE TRANSACTION routing
                    //console.log(markForAdmin.action)
                    //console.log("You just fetched: "+`${API_URL}/${routing}/${userID}/${childID}/${account}`)

                    if (markForAdmin.action == "approve" || markForAdmin.action == "pending") {
                        fetch(`${API_URL}/${routing}/${userID}/${childID}/${account}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(markForAdmin)
                        })
                            .then(incoming => incoming.json())
                            .then(response => {
                                console.log(response)
                                console.log(markForAdmin)
                                if ((markForAdmin.action == "approve" || markForAdmin.action == "pending")
                                    && response.serverStatus == 34) {
                                    document.getElementById("admin-form").reset()
                                    setMarkForAdmin("")
                                }
                                else alert(response.serverStatus)
                            })
                            .catch(console.error)
                    }
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
                <p>ID: {markForAdmin.transID || markForAdmin.choreID || "N/A"}</p>
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
                    if (e.target.value == "approve") markForAdmin.action = "approve"
                    if (e.target.value == "pending") markForAdmin.action = "pending"
                    if (e.target.value == "remove") markForAdmin.action = "remove"
                    setMarkForAdmin(markForAdmin)
                }}>
                    <option value="">Select Action</option>
                    {account!=="chores" && markForAdmin.isPending!="false"?<option value="approve">Approve</option>:""}
                    {(account!=="chores" && markForAdmin.isPending=="false") && account!="credit"?<option value="pending">Pending</option>:""}
                    <option value="remove">Remove</option>
                </select>

                <button style={{ backgroundColor: "red" }}>Run Action</button>
            </form>
        </>
    )
}