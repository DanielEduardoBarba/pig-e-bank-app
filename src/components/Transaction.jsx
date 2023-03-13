
export default function Transaction({setModal,TX,setMarkForAdmin}){
    

    return(
        <>
            <div className="single-transaction" style={{opacity:TX.isPending!="false"?0.3:1}}>
                <button className="admin-transaction-btn" onClick={()=>{
                    setMarkForAdmin(TX)
                }}></button>
                <p className="transaction-description">{TX.title}</p>
                {/* <p>{String(TX.account)}</p> */}
                <p>{TX.amount<0?"debit":"credit"}</p>
                <p className="transaction-amount">
                    {TX.amount<0
                        ?"-$"
                        :"$"}
                        {TX.amount<0
                            ?Number(TX.amount*-1).toFixed(2)
                            :Number(TX.amount).toFixed(2)
                            }</p>
                <p className="transaction-amount">
                     {TX.isPending!="false"
                        ?"Pending"
                        :TX.currentBalance<0
                            ?"-$"
                            :"$"} 
                            {TX.isPending!="false"
                                ?""
                                :TX.currentBalance<0
                                        ?(Number(TX.currentBalance)*-1).toFixed(2)
                                        :Number(TX.currentBalance).toFixed(2)
                                        }</p>
            </div>
            {

            }
        </>
    )
}