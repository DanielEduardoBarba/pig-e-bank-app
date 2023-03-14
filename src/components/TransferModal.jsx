import { useState, useContext } from "react"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"
import shortCoins from "../assets/short-coins.wav"

const transactionTemplate = { amount: "", title: "" }

export default function TransferModal({ availableBalance, markForCreditPay, setMarkForCredit, account, setModal }) {

    const { userID, childID } = useContext(UserProvider)
    const [newTransaction, setNewTransaction] = useState(transactionTemplate)
    const [error, setError] = useState("")

    const checkBalance = (e) => {
        e.preventDefault()

        if (newTransaction.sendFrom
            && account == "credit") fetch(`${API_URL}/transactions/${userID}/${childID}/${newTransaction.sendFrom}`)
                .then(incoming => incoming.json())
                .then(data => {

                    let fromAccountFunds = 0
                    for (let i = 0; i < data.length; i++) {
                        fromAccountFunds += Number(data[i].amount)
                    }

                    if (fromAccountFunds >= newTransaction.amount) submitTransfer(e)
                    else {
                        setError(`Insufficient funds from ${newTransaction.sendFrom}!`)
                        document.getElementById("amount").style.backgroundColor = "yellow"
                        document.getElementById("type").style.backgroundColor = "yellow"
                    }

                })
                .catch(console.error)
    }




    const submitTransfer = (e) => {
        e.preventDefault()

        if (availableBalance < newTransaction.amount) {
            setError("Insufficient funds!")
            document.getElementById("amount").style.backgroundColor = "yellow"
            return
        }
        
        if (newTransaction.amount) {

            newTransaction.childID = childID
            newTransaction.userID = userID

            if (account == "credit") {

                newTransaction.sendTo = markForCreditPay.loanID
                newTransaction.account = newTransaction.sendFrom
                newTransaction.title = `Payment: ${newTransaction.sendFrom} to ${newTransaction.sendTo}`
            } else {

                newTransaction.sendFrom = account
                newTransaction.account = newTransaction.sendFrom
                newTransaction.title = `Transfer: ${newTransaction.sendFrom} to ${newTransaction.sendTo}`
            }

            newTransaction.isPending = "false"
            newTransaction.amount *= -1
            
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
                        newTransaction.account = newTransaction.sendTo
                        newTransaction.amount *= -1

                        fetch(`${API_URL}/transactions`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(newTransaction)
                        })
                            .then(incoming => incoming.json())
                            .then(response => {
                                    console.log(response)
                                if (response.serverStatus == 2) {
                                    if(account=="credit")setMarkForCredit("")
                                    setNewTransaction(transactionTemplate)
                                    new Audio(shortCoins).play()
                                    document.getElementById("transaction-form").reset()
                                    setModal(0)
                                }
                                else setError("Transaction failed :( try again...")

                            })
                            .catch(console.error)
                    }
                    else setError("Server failed :( try again...")

                })
                .catch(console.error)

        }
        else {
            if (!newTransaction.amount) document.getElementById("amount").style.backgroundColor = "yellow"
            if (!newTransaction.sendTo) document.getElementById("type").style.backgroundColor = "yellow"
        }

    }



    return (
        <>
            <div className='blurr-background' onClick={() => {
                setModal(0)
            }} />
            <div className="TransactionModal">

                <h3>{error
                    ? error
                    : account == "credit"
                        ? "Make A Payment"
                        : "Transfer Funds"}</h3>

                <form id="transaction-form" className="transaction-form" onSubmit={e => account == "credit" ? checkBalance(e) : submitTransfer(e)}>

                    <label>{account == "credit"
                        ? `Pay from which account?`
                        : `Transfer from ${account} to`
                    }</label>

                    <select name="type" id="type" onChange={e => {
                        if (account == "credit") newTransaction.sendFrom = e.target.value
                        else newTransaction.sendTo = e.target.value
                        setNewTransaction(newTransaction)
                    }}>
                        <option value="">Select Account</option>
                        {account == "checking" ? "" : <option value="checking">Checking</option>}
                        {account == "savings" ? "" : <option value="savings">Savings</option>}
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