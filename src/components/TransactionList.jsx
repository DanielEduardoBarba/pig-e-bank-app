import Transaction from "../components/Transaction"
import { API_URL } from "../URLs"
import { useEffect, useState, useContext } from "react"
import { UserProvider } from "../App"

export default function Transactionlist({credit, account, setModal, modal, setAvailableBalance,setPendingBalance, setMarkForCredit, markForAdmin, setMarkForAdmin }) {
   const{userID, childID} = useContext(UserProvider)
    const [transactions, setTransactions] = useState([])


    useEffect(() => {
        console.log("FREQ: ", credit?.frequency)
        fetch(`${API_URL}/transactions/${userID}/${childID}/${(credit?.loanID)?(credit?.loanID):account}`)
            .then(incoming => incoming.json())
            .then(data => {
                
                console.log(data)
                console.log(calculateAccount(data))
                setTransactions(calculateAccount(data))
            })
            .catch(console.error)
        }, [modal, markForAdmin])


    const calculateAccount = (data) => {
        let approved = []
        let pending = []
        let pendingBalance=0
        let availableBalance=0

        let lastFeeTime=0
        let fee=0
        
        let interestFeeTrans={}
        //not right val
        const milliSecInDay=1000
        //const milliSecInDay=86400000
        const milliSecInWeek=604800000
        const milliSecInMonth=2628000000
        const milliSecInYear=31540000000


        if(account!=="checking" && account!=="savings") availableBalance=Number(credit.amount)
        for (let i = 0; i < data.length; i++) {
            
                if(data[i].isPending=="false"){
                    data[i].currentBalance=Number(data[i].amount)
                    try{
                        if(data[i - 1].currentBalance){
                            data[i].currentBalance = (Number(data[i].amount) + Number(credit?.frequency?interestFeeTrans.currentBalance:data[i - 1].currentBalance)).toFixed(2)
                        }
                    }
                    catch{ }
                    availableBalance +=Number(data[i].amount)
                    approved.push(data[i])
               
                                try{
                                    console.log(credit?.frequency, " ", lastFeeTime," ",data[i+1]?.transID)
                                    if(credit?.frequency=="daily" && lastFeeTime<data[i+1]?.transID){
                                        lastFeeTime+=milliSecInDay

                                        console.log("APR CURR BAL ",data[i].currentBalance)
                                        console.log("APR rate ",credit?.APR)
                                        console.log("time rate ", milliSecInDay/milliSecInYear)
                                        fee = ( Number(data[i].currentBalance) * (Number(credit?.APR)))

                                        console.log("APR FEE: ", fee)
                                        interestFeeTrans={
                                            transID: lastFeeTime,
                                            account: credit.loanID,
                                            title:`Interest charge - Account: ${credit.loanID}`,
                                            isPending:"false",
                                            amount: String(fee),
                                            currentBalance:String(fee+data[i].currentBalance)
                                        }

                                        approved.push(interestFeeTrans)
                                      
                                       // data[i-1]=interestFeeTrans
                                        console.log("DATA BEING INJECTED ", interestFeeTrans)
                                        console.log("DATA AFTER inject ", data[i])

                                    }
                                }catch{
                                    
                                }
                                        
                      
                    }
                    else{
                        pendingBalance += Number(data[i].amount)
                        pending.push(data[i])
                    }

                if(i == data.length-1){
                  //  console.log("BALANCE: ",availableBalance )
                    setPendingBalance(pendingBalance)
                    setAvailableBalance(availableBalance)
                }
            
        
        }
        return [...approved, ...pending]
    }

    return (
        <>
            <div className="transaction-list">
                <div className="transactionUI">
                    <button onClick={() =>{  
                        console.log("LOCAL ACCOUNT", account)                 
                        console.log("LOCAL CREDIT", credit)                 
                        if(account=="credit")setMarkForCredit(credit)
                         setModal(1)
                    }} className="add-transaction"> Add Transaction</button>

                   {
                    account=="checking" || account=="savings"
                        ?<button onClick={()=>setModal(2)} className="make-transfer">Transfer</button>
                        :""
                    } 
                </div>
                <div>
                    {
                        transactions.slice(0).reverse().map((TX) => (
                            <Transaction key={TX.transID} setModal={setModal} TX={TX} setMarkForAdmin={setMarkForAdmin} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}