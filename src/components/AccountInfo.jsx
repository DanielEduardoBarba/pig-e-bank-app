import { useContext } from "react"
import { UserProvider } from "../App"
import userPic from "../assets/profile-emojis/3.png"


export default function AcountInfo({availableBalance, pendingBalance}) {
    const { childID } = useContext(UserProvider)

//console.log(PIC_URI)
    return (
        <>
            <div className="AccountInfo">
                <img
                    style={{ width: '100px', height: '100px' }}
                    src={userPic} />
                <p>Welcome back {childID}!</p>

                <p>Available: ${Number(availableBalance).toFixed(2) || "0.00"}</p>
                <p>Pending: ${Number(pendingBalance).toFixed(2) || "0.00"}</p>
                <p>Balance: ${(Number(pendingBalance)+Number(availableBalance)).toFixed(2) || "0.00"}</p>
            </div>
        </>
    )
}