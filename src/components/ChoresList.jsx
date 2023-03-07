import { useState,useEffect } from "react"
import { API_URL } from "../URLs"
import Chore from "./Chore"



export default function ChoresList({ setMarkComplete}){
    const [chores, setChores] = useState()
    
    useEffect(()=>{

        fetch(`${API_URL}/chores`)
        .then(incoming=>incoming.json())
        .then(data=>{

            setChores(data)
            console.log(data)

        })
        .catch(console.error)
    },[setMarkComplete])
    return(
        <>
        <div className="choreslist">
            {
                chores
                ?chores.map(CH=> <Chore key={CH.choreID} CH={CH} setMarkComplete={setMarkComplete}/> )
                :""
            }
        </div>
        </>
    )
}