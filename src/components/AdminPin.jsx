import { API_URL } from "../URLs"

let enteredPin = 0

export default function AdminPin({ setError, markForAdmin,pin, setPin, setAdminPin }) {

    let pinForm = document.getElementById("pin").style

const checkPin = () =>{
    fetch(`${API_URL}/findpin/${markForAdmin.userID}/${markForAdmin.childID}`)
    .then(incoming => incoming.json())
    .then(response => { 
        if( pin == response[0].adminPin){
            setAdminPin(response[0].adminPin)
            setError("")
        }
        else{
            setError("Pin Not Correct!")
                pinForm.backgroundColor = "yellow"
        }
    })
}

    return (
        <>
            <input name="pin" id="pin" placeholder="pin"
                    onChange={e => {
                        if (e.target.value >= 0) {
                            setPin(e.target.value)
                        }
                        else document.getElementById("pin").value = e.target.value.substring(0, e.target.value.length - 1)
                    }} />
                <button onClick={()=>checkPin()} style={{ backgroundColor: "pink" }}>Enter Pin</button>

        </>
    )
}