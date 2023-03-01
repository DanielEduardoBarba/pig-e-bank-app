import { useState, useEffect } from "react"
import Transaction from "../components/Transaction"
import { MAIN_URL } from "../URLs"
import "./Checking.css"

export default function Checking({userID}){
    const [transactions, setTransactions] = useState([])

    useEffect(()=>{

        fetch(`${MAIN_URL}/transactions`)
        .then(incoming=>incoming.json())
        .then(data=>{
            console.log(data)
            setTransactions(data)
        })

    },[])


    return(
        <>
        <p>Checking account</p>
        <p>USER ID: {userID}</p>
        <div className="transactionlist">{
            transactions.map(TX =>(
                <Transaction key={TX.transID} TX={TX}/>
            ))
        }</div>
        </>
    )
}