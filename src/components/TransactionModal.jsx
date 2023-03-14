import { useState, useContext } from "react"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"
import insertCoin from "../assets/insert-coin.wav"

const transactionTemplate = { amount: "", title: "", type: "" }

export default function TransactionModal({ markForCredit, account, setModal }) {

    const { userID, childID } = useContext(UserProvider)
    const [newTransaction, setNewTransaction] = useState(transactionTemplate)
    const [error, setError] = useState("")

    const submitTransaction = (e) => {
        e.preventDefault()

        let amountAlert = document.getElementById("amount").style
        let typeAlert = document.getElementById("type").style
        let titleAlert = document.getElementById("title").style

        if (newTransaction.type && newTransaction.title && newTransaction.amount) {
            newTransaction.childID = childID
            newTransaction.userID = userID

            if (account == "checking" || account == "savings") newTransaction.account = account
            else newTransaction.account = markForCredit.loanID


            if (newTransaction.type == "debit") {
                newTransaction.isPending = "false"
                newTransaction.amount *= -1
            } else {
                newTransaction.isPending = ""
            }

            fetch(`${API_URL}/transactions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTransaction)
            })
                .then(incoming => incoming.json())
                .then(response => {
              
                    if (response.serverStatus == 2) {
                        new Audio(insertCoin).play()
                        document.getElementById("transaction-form").reset()
                        setModal(0)
                    }
                    else setError("Server failed :( try again...")

                })
                .catch(console.error)

        }
        else {
            if (!newTransaction.amount) amountAlert.backgroundColor = "yellow"
            if (!newTransaction.type) typeAlert.backgroundColor = "yellow"
            if (!newTransaction.title) titleAlert.backgroundColor = "yellow"
        }

    }

    return (
        <>
            <div className='blurr-background' onClick={() => {
                setModal(0)
            }} />

            <div className="TransactionModal">

                <h3>{error || "Add Transaction"}</h3>

                <form id="transaction-form" className="transaction-form" onSubmit={e => submitTransaction(e)}>

                    <label>Transaction Name</label>
                    <input name="title" id="title" placeholder="transaction name" onChange={e => {
                        const asciiVal = e.target.value.charCodeAt(e.target.value.length - 1)
                        if ((asciiVal >= 65 && asciiVal <= 90) || (asciiVal >= 97 && asciiVal <= 122) || (asciiVal == 32 && e.target.value.length > 1)) {
                            newTransaction.title = e.target.value
                            setNewTransaction(newTransaction)
                        }
                        else document.getElementById("title").value = e.target.value.substring(0, e.target.value.length - 1)

                    }} />

                    <label>Transaction Type</label>
                    <select name="type" id="type" onChange={e => {
                        newTransaction.type = e.target.value
                        setNewTransaction(newTransaction)
                    }}>
                        <option value="">Select Transaction Type</option>
                        <option value="debit">Debit</option>
                        {account == "credit" ? "" : <option value="credit">Credit</option>}
                    </select>

                    <label>$</label>
                    <input name="amount" id="amount" placeholder="amount"
                        onChange={e => {
                            if (e.target.value >= 0) {
                                newTransaction.amount = e.target.value
                                setNewTransaction(newTransaction)
                            }
                            else document.getElementById("amount").value = e.target.value.substring(0, e.target.value.length - 1)
                        }} />

                    <button>Submit</button>
                </form>

            </div>

        </>
    )
}