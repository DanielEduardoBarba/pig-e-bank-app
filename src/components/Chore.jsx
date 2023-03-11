import { useState,useEffect } from "react"

export default function Chore({CH, setMarkComplete, setMarkForAdmin}){
    
    return(
        <>
        <div style={{opacity:CH.isDone!=="false"?"0.4":"1"}} className="chore">

            <p onClick={()=>{
                CH.action="chore"
            setMarkForAdmin(CH)
            console.log(CH)
            }}>CHORE ITEM</p>
            <p>{CH.title}</p>
            <p>Payout: ${CH.amount}</p>
            {/* <p>{CH.isDone}</p> */}
            <button 
            //style={{pointerEvents: CH.isDone!=="false"?"none":"all"}} 
            onClick={()=>setMarkComplete(CH)}>DONE</button>
        </div>
        {
            
        }
       
        </>
    )

}
