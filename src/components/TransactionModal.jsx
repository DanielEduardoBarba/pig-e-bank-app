import { useState, useContext, useEffect } from "react"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"

const transactionTemplate = { amount: "", title: "", type: "" }

export default function TransactionModal({account,setModal}) {

    const { userID, childID } = useContext(UserProvider)
    const [newTransaction, setNewTransaction] = useState(transactionTemplate)
    const [error, setError] = useState("")


    const submitTransaction = (e) => {
        e.preventDefault()
        let amountAlert = document.getElementById("amount").style
        let typeAlert = document.getElementById("type").style
        let titleAlert = document.getElementById("title").style 

        if (newTransaction.type && newTransaction.title && newTransaction.amount) {
            console.log(newTransaction )
            newTransaction.childID=childID
            newTransaction.userID=userID
            newTransaction.account=account
            
            if(newTransaction.type=="debit"){
                newTransaction.isPending="false"
                newTransaction.amount*=-1
            } 
            

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
                else setError("Server failed :( try again...")
                    
             })
             .catch(console.error)
        
        }
        else { 
            if (!newTransaction.amount) amountAlert.backgroundColor="yellow"
            if (!newTransaction.type) typeAlert.backgroundColor="yellow"
            if (!newTransaction.title) titleAlert.backgroundColor="yellow"
        }
           


        
    }



    return (
        <>
            <div className='blurr-background' onClick={()=>{
                setModal(0)
                }}/>
            <div className="TransactionModal">
                <h3>{error || "Add Transaction"}</h3>
                <form id="transaction-form" className="transaction-form" onSubmit={e =>submitTransaction(e)}>
                    <label>Transaction Name</label>
                    <input name="title" id="title" placeholder="transaction name" onChange={e => {
                        newTransaction.title = e.target.value
                        setNewTransaction(newTransaction)
                    }} />

                    <label>Transaction Type</label>
                    <select name="type" id="type" onChange={e => {
                        newTransaction.type = e.target.value
                        setNewTransaction(newTransaction)
                    }}>
                        <option value="">Select Transaction Type</option>
                        <option value="debit">Debit</option>
                        <option value="credit">Credit</option>
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