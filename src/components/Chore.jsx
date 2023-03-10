import { useState,useEffect } from "react"
import { API_URL } from "../URLs"
import ChoresModal from "./ChoresModal"


export default function Chore({CH, setMarkComplete}){
    const[isDone,setIsDone] = useState("")

    useEffect(()=>{
        setIsDone(CH.isDone)
    },[])

  
  

    return(
        <>
        <div style={{opacity:CH.isDone!=="false"?"0.4":"1"}} className="chore">

            <p>CHORE ITEM</p>
            <p>{CH.title}</p>
            <p>Payout: ${CH.amount}</p>
            {/* <p>{CH.isDone}</p> */}
            <button 
            //style={{pointerEvents: CH.isDone!=="false"?"none":"all"}} 
            onClick={()=>setMarkComplete(CH)}>DONE</button>
        </div>
       
        </>
    )

}
