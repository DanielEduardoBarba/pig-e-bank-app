import { useEffect } from "react"

export default function Transaction({TX,setMarkForAdmin}){
    
    useEffect(()=>{
        
   
    },[])

    //console.log("OK"+transactions[index].amount)

    return(
        <>
            <div className="transaction" style={{opacity:TX.isPending!="false"?0.3:1}}>
                <p>{TX.title}</p>
                <p>{TX.amount}</p>
                <p onClick={()=>{
                    setMarkForAdmin(TX)
                }}>{TX.isPending!="false"?"Pending":TX.currentBalance}</p>
            </div>
        </>
    )
}