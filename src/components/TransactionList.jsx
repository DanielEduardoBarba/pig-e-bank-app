import Transaction from "../components/Transaction"
import { API_URL } from "../URLs"
import { useEffect, useState } from "react"

export default function Transactionlist({setModal,modal}) {
    const [transactions, setTransactions] = useState([])
    
    useEffect(() => {

        fetch(`${API_URL}/transactions`)
            .then(incoming => incoming.json())
            .then(data => {
                console.log(data)
                setTransactions(data)
            })

    }, [modal])


   

    return (
        <>
            <div className="transactionlist">
                <div>
                {
                    transactions.map(TX => (
                        <Transaction key={TX.transID} TX={TX} />
                    ))
                }
                </div>
                <button onClick={()=>setModal(1)} className="add-transaction"> Add Transaction</button>
            </div>
        </>
    )
}