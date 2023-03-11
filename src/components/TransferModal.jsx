import { useState, useContext, useEffect } from "react"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"

const transactionTemplate = { amount: "", title: ""}

export default function TransferModal({availableBalance,account,setModal}) {

    const { userID, childID } = useContext(UserProvider)
    const [newTransaction, setNewTransaction] = useState(transactionTemplate)
    const [error, setError] = useState("")


    const submitTransfer = (e) => {
        e.preventDefault()
        let amountAlert = document.getElementById("amount").style
        let typeAlert = document.getElementById("type").style

        if(availableBalance<newTransaction.amount){
            setError("Insufficient funds!")
            amountAlert.backgroundColor="yellow"
            return
        }


        if (newTransaction.sendTo && newTransaction.amount) {

            newTransaction.childID=childID
            newTransaction.userID=userID

            newTransaction.sendFrom=account
            newTransaction.account=newTransaction.sendFrom

            newTransaction.isPending="false"
            newTransaction.title=`Transfer: ${newTransaction.sendFrom} to ${newTransaction.sendTo}`
            newTransaction.amount *= -1
            
            
            console.log("SEND FROM: ",newTransaction)
            

            fetch(`${API_URL}/transactions`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newTransaction)
            })
            .then(incoming=>incoming.json())
            .then(response=>{

                if(response.serverStatus==2){
                    newTransaction.account=newTransaction.sendTo
                    newTransaction.amount *= -1
                        fetch(`${API_URL}/transactions`,{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(newTransaction)
                        })
                        .then(incoming=>incoming.json())
                        .then(response=>{
            
                            if(response.serverStatus==2){
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
            if (!newTransaction.amount) amountAlert.backgroundColor="yellow"
            if (!newTransaction.sendTo) typeAlert.backgroundColor="yellow"
        }
           


        
    }



    return (
        <>
            <div className='blurr-background' onClick={()=>{
                setModal(0)
                }}/>
            <div className="TransactionModal">
                <h3>{error || "Transfer Funds"}</h3>
                <form id="transaction-form" className="transaction-form" onSubmit={e =>submitTransfer(e)}>
                   <label>Transfer from {account} to</label>
                    <select name="type" id="type" onChange={e => {
                        newTransaction.sendTo = e.target.value
                        setNewTransaction(newTransaction)
                    }}>
                        <option value="">Select Account</option>
                        {account=="checking"?"":<option value="checking">Checking</option>}
                        {account=="savings"?"":<option value="savings">Savings</option>}
                        {/* <option value="credit">credit</option> */}
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