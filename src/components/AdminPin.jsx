import { API_URL } from "../URLs"

let enteredPin = 0

export default function AdminPin({ setError, markForAdmin,pin, setPin, setAdminPin }) {


const checkPin = () =>{
    fetch(`${API_URL}/findpin/${markForAdmin.userID}/${markForAdmin.childID}`)
    .then(incoming => incoming.json())
    .then(response => { 
        console.log("PIN ", pin)
        console.log("ADMINPIN ", response[0].adminPin)
        if( pin == response[0].adminPin){
            setAdminPin(response[0].adminPin)
            setError("")
        }
        else{
            setError("Pin Not Correct!")
            document.getElementById("pin").style.backgroundColor = "yellow"
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