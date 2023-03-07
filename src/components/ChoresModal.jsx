import { useState, useContext, useEffect } from "react"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"

let enteredPin=0


export default function ChoresModal({markComplete, setMarkComplete}) {
    const { userID, childID } = useContext(UserProvider)
    const [pin, setPin] = useState(0)
    const [error, setError] = useState("")
    
    const submitWithPin = (e) => {
        
        e.preventDefault()
        let pinForm = document.getElementById("pin").style
        
        
        fetch(`${API_URL}/findpin/${markComplete.userID}/${markComplete.childID}`)
        .then(incoming=>incoming.json())
        .then(response=>{
            if(response[0].childID == markComplete.childID &&
                 response[0].userID == markComplete.userID && 
                 response[0].pin == pin){
                 
                document.getElementById("chores-form").reset()
                setMarkComplete("")
            
            
                 }
                 else{
                    pinForm.backgroundColor = "yellow"
                    setError("Please enter correct pin!")
                 }
         })
         .catch(console.error)
    
    
        
    }
    
       
    
    



    return (
        <>
            <div className='blurr-background' onClick={()=>{
                setMarkComplete("")
                }}/>
            <div className="ChoresModal">
                <h3>{error || "Confirm Task is Done!"}</h3>
                <form id="chores-form" className="chores-form" onSubmit={e =>submitWithPin(e)}>

                    <p>Did you complete the task:</p>
                    <p style={{fontWeight: "900", backgroundColor: "orange"}}>
                    {markComplete.title}</p>

                    <label>Confirm with your pin</label>

                    <input name="pin" id="pin" placeholder="pin"
                        onChange={e => {
                            if (e.target.value >= 0) {
                                enteredPin = e.target.value
                                setPin(enteredPin)
                            }
                            else document.getElementById("pin").value = e.target.value.substring(0, e.target.value.length - 1)
                        }} />

                <button>I'm Done!</button>
                </form>

            </div>

        </>
    )
}