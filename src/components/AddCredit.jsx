import { useState, useContext, useEffect } from "react"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"

const transactionTemplate = { amount: "", title: "", type: "" }

export default function AddCredit({account,setModal}) {

    const { userID, childID } = useContext(UserProvider)
    const [newCredit, setNewCredit] = useState(transactionTemplate)
    const [error, setError] = useState("")


    const submitCreditLine = (e) => {
        e.preventDefault()
          
            fetch(`${API_URL}/credit`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newCredit)
            })
            .then(incoming=>incoming.json())
            .then(response=>{
                console.log(response)
                if(response.serverStatus==2){
                    document.getElementById("transaction-form").reset()
                    setModal(0)
                } 
                else setError("Server failed :( try again...")
                    
             })
             .catch(console.error)
        
        
       
            // if (!newCredit.amount) amountAlert.backgroundColor="yellow"
            // if (!newCredit.type) typeAlert.backgroundColor="yellow"
            // if (!newCredit.title) titleAlert.backgroundColor="yellow"
        
           
    }

    return (
        <>
        
            <form id="transaction-form" className="transaction-form" onSubmit={e =>submitCreditLine(e)}>
                    <label>Credit Name</label>
                    <input name="title" id="title" placeholder="credit name" onChange={e => {
                        newCredit.title = e.target.value
                        setNewCredit(newCredit)
                    }} />

                    <label>APR</label>
                    <input name="APR" id="APR" placeholder="0-100%"
                        onChange={e => {
                            if (e.target.value<=100 && e.target.value > 0) {
                                newCredit.APR = e.target.value
                                setNewCredit(newCredit)
                            }
                            else document.getElementById("APR").value = e.target.value.substring(0, e.target.value.length - 1)
                        }} />

            <select name="frequency" id="frequency" onChange={e => {
                        newCredit.frequency = e.target.value
                        setNewCredit(newCredit)
                    }}>
                        <option value="">Statement Frequency</option>
                        <option value="monthly">Monthly</option>
                        <option value="weekly">Weekly</option>
                        <option value="daily">Daily</option>
                        <option value="seconds">Seconds</option>
                    </select>

                    <label>Credit Line </label>
                    <input name="amount" id="amount" placeholder="amount $"
                        onChange={e => {
                            if (e.target.value >= 0) {
                                newCredit.amount = e.target.value
                                setNewCredit(newCredit)
                            }
                            else document.getElementById("amount").value = e.target.value.substring(0, e.target.value.length - 1)
                        }} />

                <button>Add Credit Line</button>
                </form>

          

        </>
    )
}