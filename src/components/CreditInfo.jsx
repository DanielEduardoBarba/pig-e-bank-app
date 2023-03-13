import { PIC_URI } from "../URLs"
import { useContext, useState } from "react"



export default function CreditInfo({credit, setModal, account, availableBalance,setMarkForCreditPay, pendingBalance}) {


    console.log("AVAIL ", availableBalance)
    console.log("CREDIT ", credit)
    return (
        <>
            <div className="CreditInfo">
                <p>Credit ID: {credit.loanID}</p>
                <p>Available: ${Number(availableBalance).toFixed(2) || "0.00"}</p>
                <p>Pending: ${Number(pendingBalance).toFixed(2) || "0.00"}</p>
                <p>Balance: ${ (Number(pendingBalance)+Number(availableBalance)).toFixed(2) || "0.00"}</p>
                <button onClick={()=>{
                    const markThisCreditLine ={
                        account,
                        availableBalance,
                        loanID:credit.loanID
                    }
                    setMarkForCreditPay(markThisCreditLine)
                    setModal(2)
                }}> Make a Payment</button>
            </div>
        </>
    )
}