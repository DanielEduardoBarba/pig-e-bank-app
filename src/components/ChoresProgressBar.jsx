import { useState, useEffect } from "react"


export default function ChoresProgressBar({chores}){
    const [bar, setBar] = useState(0)

    ///fix this not rednering
    useEffect(()=>{
        let done=0

        for(let i = 0;i<chores.length;i++){
            if(!chores[i].isDone=="false") done++
        }
        setBar(done/chores.length)
        
    },[chores])

    return(
        <>
        <div style={{width:"100%", backgroundColor:"grey"}}>
            <div style={{width:`${bar}%`, backgroundColor:"green"}}></div>
        </div>

        </>
    )

}