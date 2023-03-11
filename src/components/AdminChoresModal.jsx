import { useState, useConte 
 } from "react"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"

const choreTemplate = { amount: "", title: "", type: "" }

export default function AdminChoresModal({account,setModal}) {

    const { userID, childID } = useContext(UserProvider)
    const [newChore, setNewChore] = useState(choreTemplate)
    const [error, setError] = useState("")


    const submitTransaction = (e) => {
        e.preventDefault()
        let amountAlert = document.getElementById("amount").style
        let typeAlert = document.getElementById("type").style
        let titleAlert = document.getElementById("title").style 

        if (newChore.type && newChore.title && newChore.amount) {
            newChore.childID=childID
            newChore.userID=userID
            newChore.account=account
            
            if(newChore.type=="debit"){
                newChore.isPending="false"
                newChore.amount*=-1
            } 
            
            
            console.log(newChore )
            fetch(`${API_URL}/chores`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newChore)
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
            if (!newChore.amount) amountAlert.backgroundColor="yellow"
            if (!newChore.type) typeAlert.backgroundColor="yellow"
            if (!newChore.title) titleAlert.backgroundColor="yellow"
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
                        newChore.title = e.target.value
                        setNewChore(newChore)
                    }} />

                    <label>Transaction Type</label>
                    <select name="type" id="type" onChange={e => {
                        newChore.type = e.target.value
                        setNewChore(newChore)
                    }}>
                        <option value="">Select Transaction Type</option>
                        <option value="debit">Debit</option>
                        <option value="credit">Credit</option>
                    </select>

                    <label>$</label>
                    <input name="amount" id="amount" placeholder="amount"
                        onChange={e => {
                            if (e.target.value >= 0) {
                                newChore.amount = e.target.value
                                setNewChore(newChore)
                            }
                            else document.getElementById("amount").value = e.target.value.substring(0, e.target.value.length - 1)
                        }} />

                <button>Submit</button>
                </form>

            </div>

        </>
    )
}