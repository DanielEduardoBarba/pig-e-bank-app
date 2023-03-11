import { useState } from "react"

export default function ChildLoginSection({ setError, children, userID, setChildID }) {
    const [checkPin, setCheckPin] = useState("")
    const [checkChildID, setCheckChildID] = useState("")
    const [pin, setPin] = useState("")

    const confirmChildAccount = () =>{

        if(pin==checkPin && pin && checkPin){
            setChildID(checkChildID)
            //console.log("CHILD CONFIRMED ", checkChildID)
        }
        else{
            setError("Pin Not Correct!")
            document.getElementById("pin").style.backgroundColor="yellow"
        }

    }

    return (
        <>

            <select name="action" id="action" onChange={e => {
                const selected = e.target.value.split("⌊")
                setCheckChildID(selected[0])
                setCheckPin(selected[1])
                console.log(selected)
                }}>
                {
                    children.map(child =><option value={child.childID+"⌊"+child.pin}>{child.childID}</option>)
                }
            </select>
            <input name="pin" id="pin" placeholder="pin"
                    onChange={e => {
                        if (e.target.value >= 0) {
                            setPin(e.target.value)
                        }
                        else document.getElementById("pin").value = e.target.value.substring(0, e.target.value.length - 1)
                    }} />
                <button onClick={()=>confirmChildAccount()} style={{ backgroundColor: "pink" }}>Login</button>



        </>
    )
}