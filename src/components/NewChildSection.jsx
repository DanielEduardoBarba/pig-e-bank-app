import { useState } from "react"
import { API_URL } from "../URLs"
export default function NewChildSection({setParentModal, setNewChild, setError, children, userID, setChildID }) {
    const [adminPin, setAdminPin] = useState("")
    const [confirmAdminPin, setConfirmAdminPin] = useState("")
    const [childName, setChildName] = useState("")
    const [pin, setPin] = useState("")

    const createChildAccount = (e) => {
        e.preventDefault()

    if(confirmAdminPin == adminPin){

        if (adminPin && childName && pin) {

            const newChild={
                userID,
                adminPin,
                childID:childName,
                pin
            }

            fetch(`${API_URL}/children`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(newChild)
            })
            .then(incoming=>incoming.json())
            .then(response=>{
                console.log(response)
                if(response.serverStatus==2){
                    setParentModal(0)
                } 
                else setError("Server failed :( try again...")
                    
             })
             .catch(console.error)
            setError("")
            setNewChild(" ")
        }
        else {
            setError("Pin Not Correct!")
            document.getElementById("pin").style.backgroundColor = "yellow"
        }
    }else{
        setError("Pins Not matching!")
        document.getElementById("adminPin").style.backgroundColor="yellow"
        document.getElementById("confirmAdminPin").style.backgroundColor="yellow"
    }

    }

    return (
        <>
          <form id="transaction-form" className="transaction-form" onSubmit={e =>createChildAccount(e)}>
            <input style={{opacity:(childName && pin)?1:0.3,
            pointerEvents:(childName && pin)?"all":"none"}} 
            name="adminPin" id="adminPin" 
            placeholder="admin pin"
            type="password"
                onChange={e => {
                    if (e.target.value >= 0) {
                        setAdminPin(e.target.value)
                    }
                    else document.getElementById("adminPin").value = e.target.value.substring(0, e.target.value.length - 1)
                }} />
            <input style={{opacity:(childName && pin)?1:0.3,
            pointerEvents:(childName && pin)?"all":"none"}} 
            name="confirmAdminPin" id="confirmAdminPin" 
            placeholder="confirm admin pin"
            type="password"
                onChange={e => {
                    if (e.target.value >= 0) {
                        setConfirmAdminPin(e.target.value)
                    }
                    else document.getElementById("confirmAdminPin").value = e.target.value.substring(0, e.target.value.length - 1)
                }} />

            <input name="childName" id="childName" placeholder="child name"
                onChange={e => {
                    const asciiVal = e.target.value.charCodeAt(e.target.value.length - 1)
                    //console.log(asciiVal)
                    if ((asciiVal >= 65 && asciiVal <= 90) || (asciiVal >= 97 && asciiVal <= 122) || (asciiVal == 32 && e.target.value.length > 1)) {
                        setChildName(e.target.value)
                        document.getElementById("adminPin").placeholder=`admin pin for ${e.target.value}`
                    }
                    else document.getElementById("childName").value = e.target.value.substring(0, e.target.value.length - 1)
                }} />

            <input name="pin" id="pin" placeholder="child pin"
                onChange={e => {
                    if (e.target.value >= 0) {
                        setPin(e.target.value)
                        
                    }
                    else document.getElementById("pin").value = e.target.value.substring(0, e.target.value.length - 1)
                }} />

            <button style={{ backgroundColor: "pink" }}>Create Child</button>
            </form>
        </>
    )
}