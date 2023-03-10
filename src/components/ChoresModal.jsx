import { useState, useContext, useEffect } from "react"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"

let enteredPin = 0


export default function ChoresModal({ markComplete, setMarkComplete }) {
    const { userID, childID } = useContext(UserProvider)
    const [pin, setPin] = useState(0)
    const [error, setError] = useState("")

    const submitWithPin = (e) => {

        e.preventDefault()
        let pinForm = document.getElementById("pin").style


        fetch(`${API_URL}/findpin/${markComplete.userID}/${markComplete.childID}`)
            .then(incoming => incoming.json())
            .then(response => {
                if (response[0].childID == markComplete.childID &&
                    response[0].userID == markComplete.userID &&
                    markComplete.action &&
                    response[0].pin == pin) {

                  
                    fetch(`${API_URL}/chores`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(markComplete)
                    })
                        .then(incoming => incoming.json())
                        .then(response => {

                            if (response.serverStatus == 2 && markComplete.action=="done") {
                                document.getElementById("chores-form").reset()
                                setMarkComplete("")
                            }
                            else if (response.serverStatus == 34 && markComplete.action=="pending") {
                                document.getElementById("chores-form").reset()
                                setMarkComplete("")
                            }
                            else alert("You alread marked this as done")

                        })
                        .catch(console.error)
                }
                else {
                    pinForm.backgroundColor = "yellow"
                    setError("Please enter correct pin!")
                }
            })
            .catch(console.error)
    }



    return (
        <>
            <div className='blurr-background' onClick={() => {
                setMarkComplete("")
            }} />
            <div className="ChoresModal">
                <h3>{error || "Confirm Task is Done!"}</h3>
                <form id="chores-form" className="chores-form" onSubmit={e => submitWithPin(e)}>

                    <p>Did you complete the task:</p>
                    <p style={{ fontWeight: "900", backgroundColor: "orange" }}>
                        {markComplete.title}</p>

                    <select name="action" id="action" onChange={e => {
                    if (e.target.value == "") markComplete.action = ""
                    if (e.target.value == "done") markComplete.action = "done"
                    if (e.target.value == "pending") markComplete.action = "pending"
                    setMarkComplete(markComplete)
                }}>
                    <option value="">Select Action</option>
                    <option value="done">Done</option>
                    <option value="pending">Not Done</option>
                </select>

                    <label>Confirm with your pin</label>

                    <input name="pin" id="pin" placeholder="pin"
                        onChange={e => {
                            if (e.target.value >= 0) {
                                enteredPin = e.target.value
                                setPin(enteredPin)
                            }
                            else document.getElementById("pin").value = e.target.value.substring(0, e.target.value.length - 1)
                        }} />

                    <button>Mark Chore</button>
                   
                </form>

            </div>

        </>
    )
}