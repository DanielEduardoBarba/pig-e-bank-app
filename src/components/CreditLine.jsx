import { useState } from "react"
import CreditInfo from "../components/CreditInfo"
import TransactionList from "../components/TransactionList"
export default function CreditLine({account, modal, setModal, credit, setMarkForCredit}){
    const [availableBalance, setAvailableBalance] = useState(0)
    const [pendingBalance, setPendingBalance] = useState(0)
    const [markForAdmin, setMarkForAdmin] = useState("")

    return(
        <>
        <div className="CreditLine">
            
        <CreditInfo credit={credit} availableBalance={availableBalance} pendingBalance={pendingBalance}/> 

         <TransactionList credit={credit} setMarkForCredit={setMarkForCredit}
          account={account} setModal={setModal} 
        modal={modal} 
        setAvailableBalance={setAvailableBalance}
        setPendingBalance={setPendingBalance}
        markForAdmin={markForAdmin} 
        setMarkForAdmin={setMarkForAdmin}/>

        </div>
        </>
    )
}