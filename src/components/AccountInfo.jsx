import userPic from "../assets/profile-emojis/3.png"
import { PIC_URI } from "../URLs"
import { useContext, useState } from "react"
import { UserProvider } from "../App"


export default function AcountInfo({availableBalance, pendingBalance}) {
    const { userID } = useContext(UserProvider)

//console.log(PIC_URI)
    return (
        <>
            <div className="AccountInfo">
                <img
                    style={{ width: '100px', height: '100px' }}
                    src={userPic} />
                <p>USER ID: {userID}</p>
                <p>Available: ${Number(availableBalance).toFixed(2) || "0.00"}</p>
                <p>Pending: ${Number(pendingBalance).toFixed(2) || "0.00"}</p>
                <p>Balance: ${(Number(pendingBalance)+Number(availableBalance)).toFixed(2) || "0.00"}</p>
            </div>
        </>
    )
}