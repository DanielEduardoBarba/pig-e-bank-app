import { useState,useEffect } from "react"
import { API_URL } from "../URLs"
import Chore from "./Chore"
import ChoresProgressBar from "./ChoresProgressBar"



export default function ChoresList({markComplete, setMarkComplete}){
    const [chores, setChores] = useState()
    
    useEffect(()=>{

        fetch(`${API_URL}/chores`)
        .then(incoming=>incoming.json())
        .then(data=>{

            setChores(data)
            console.log(data)

        })
        .catch(console.error)
    },[markComplete])
    return(
        <>
        <div className="choreslist">
            {
                chores
                ?chores.map(CH=> <Chore key={CH.choreID} CH={CH} setMarkComplete={setMarkComplete}/> )
                :""
            }
        </div> 
        <ChoresProgressBar chores={chores} />
        </>
    )
}