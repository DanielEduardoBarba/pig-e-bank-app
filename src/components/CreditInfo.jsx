import { PIC_URI } from "../URLs"
import { useContext, useState } from "react"



export default function CreditInfo({credit, availableBalance, pendingBalance}) {

console.log(PIC_URI)
    return (
        <>
            <div className="AccountInfo">
                <p>Credit ID: {credit.loanID}</p>
                <p>Available: ${Number(availableBalance).toFixed(2) || "0.00"}</p>
                <p>Pending: ${Number(pendingBalance).toFixed(2) || "0.00"}</p>
                <p>Balance: ${credit.amount|| "0.00"}</p>
            </div>
        </>
    )
}