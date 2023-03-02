import userPic from "../assets/bear.png"
import { useContext } from "react"
import { UserProvider } from "../App"


export default function AcountInfo(){
    const {userID} = useContext(UserProvider)

    return(
        <>
        <div className="AccountInfo">
        <img style={{width:'100px', height:'100px'}} src={userPic}></img>
        <p>USER ID: {userID}</p>
        </div>
        </>
    )
}