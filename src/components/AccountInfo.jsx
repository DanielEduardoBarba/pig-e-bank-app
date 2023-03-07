import userPic from "../assets/profile-emojis/3.png"
import { useContext, useState } from "react"
import { UserProvider } from "../App"


export default function AcountInfo({balance}) {
    const { userID } = useContext(UserProvider)


    return (
        <>
            <div className="AccountInfo">
                <img
                    style={{ width: '100px', height: '100px' }}
                    src={userPic} />
                <p>USER ID: {userID}</p>
                <p>Balance: ${balance || "0.00"}</p>
            </div>
        </>
    )
}