import { useEffect } from "react"

export default function Transaction({TX,lastAmount,transactions,index,setLastAmount}){
    
    useEffect(()=>{

   
    },[])

    console.log("OK"+transactions[index].amount)

    return(
        <>
            <div className="transaction">
                <p>{TX.title}</p>
                <p>{typeof transactions[index].amount}</p>
               
            </div>
        </>
    )
}