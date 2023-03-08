import { useState,useEffect } from "react"
import { API_URL } from "../URLs"
import Chore from "./Chore"
import ChoresProgressBar from "./ChoresProgressBar"



export default function ChoresList({markComplete, setMarkComplete}){
    const [chores, setChores] = useState()
    const [bar, setBar] = useState(0)

    
    useEffect(()=>{
        
        try{
           let done=0

           for(let i = 0;i<chores.length;i++){
                if(chores[i].isDone!=="false") done++
                console.log(chores[i].isDone)
            }
            setBar(Math.floor((done/chores.length)*100))
           
       } catch{}
        
    },[chores])
    
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
        <ChoresProgressBar bar={bar} chores={chores} />
        </>
    )
}