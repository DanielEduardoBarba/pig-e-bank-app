
export default function Transaction({TX,setMarkForAdmin}){
    

    return(
        <>
            <div className="transaction" style={{opacity:TX.isPending!="false"?0.3:1}}>
                <p>{TX.title}</p>
                <p>{TX.account}</p>
                <p>{TX.amount>0?"Credit":"Debit"}</p>
                <p onClick={()=>{
                    setMarkForAdmin(TX)
                }}>{TX.amount}</p>
                <p>{TX.isPending!="false"?"Pending":TX.currentBalance}</p>
            </div>
        </>
    )
}