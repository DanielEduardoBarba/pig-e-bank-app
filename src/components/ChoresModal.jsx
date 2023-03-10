import { useState, useContext } from "react"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"

const choreTemplate = { amount: "", title: "", type: "" }

export default function ChoresModal({ setModal }) {

    const { userID, childID } = useContext(UserProvider)
    const [newChore, setNewChore] = useState(choreTemplate)
    const [error, setError] = useState("")


    const submitChore = (e) => {
        e.preventDefault()

        let amountAlert = document.getElementById("amount").style
        let titleAlert = document.getElementById("title").style

        if (newChore.title && newChore.amount) {
            newChore.childID = childID
            newChore.userID = userID
            newChore.isDone = "false"

            fetch(`${API_URL}/chores`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newChore)
            })
                .then(incoming => incoming.json())
                .then(response => {
                    if (response.serverStatus == 2) {
                        document.getElementById("chore-form").reset()
                        setModal(0)
                    }
                    else setError("Server failed :( try again...")
                })
                .catch(console.error)

        }
        else {
            if (!newChore.amount) amountAlert.backgroundColor = "yellow"
            if (!newChore.title) titleAlert.backgroundColor = "yellow"
        }
    }

    return (
        <>
            <div className='blurr-background' onClick={() => {setModal(0)}} />

            <div className="ChoresModal">

                <h3>{error || "Add Chore"}</h3>

                <form id="chore-form" className="chore-form" onSubmit={e => submitChore(e)}>

                    <label>Chore Name</label>

                    <input name="title" id="title" placeholder="chore name" onChange={e => {
                        const asciiVal = e.target.value.charCodeAt(e.target.value.length - 1)
                        if ((asciiVal >= 65 && asciiVal <= 90) || (asciiVal >= 97 && asciiVal <= 122) || (asciiVal == 32 && e.target.value.length > 1)) {
                            newChore.title = e.target.value
                            setNewChore(newChore)
                        }
                        else document.getElementById("title").value = e.target.value.substring(0, e.target.value.length - 1)
                    }} />

                    <label>$</label>
                    <input name="amount" id="amount" placeholder="amount"
                        onChange={e => {
                            if (e.target.value >= 0) {
                                newChore.amount = e.target.value
                                setNewChore(newChore)
                            }
                            else document.getElementById("amount").value = e.target.value.substring(0, e.target.value.length - 1)
                        }} />

                    <button>Add</button>
                </form>

            </div>

        </>
    )
}