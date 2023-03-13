
export default function Transaction({setModal,TX,setMarkForAdmin}){
    

    return(
        <>
            <div className="single-transaction" style={{opacity:TX.isPending!="false"?0.3:1}}>
                <button className="admin-transaction-btn" onClick={()=>{
                    setMarkForAdmin(TX)
                }}></button>
                <p>{TX.title}</p>
                <p>{String(TX.account)}</p>
                <p>{TX.amount<0?"debit":"credit"}</p>
                <p className="amount">
                    {TX.amount<0
                        ?"-"
                        :""}
                        $
                        {TX.amount<0
                            ?TX.amount*-1
                            :TX.amount
                            }</p>
                <p className="amount">
                     {TX.isPending!="false"
                        ?"Pending"
                        :TX.currentBalance<0
                            ?"-"
                            :""}
                            $
                            {TX.isPending!="false"
                                ?"Pending"
                                    :TX.currentBalance<0
                                        ?TX.currentBalance*-1
                                        :TX.currentBalance
                                        }</p>
            </div>
            {

            }
        </>
    )
}