import Transaction from "../components/Transaction"
import { API_URL } from "../URLs"
import { useEffect, useState } from "react"

export default function Transactionlist() {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {

        fetch(`${API_URL}/transactions`)
            .then(incoming => incoming.json())
            .then(data => {
                console.log(data)
                setTransactions(data)
            })

    }, [])

    return (
        <>
            <div className="transactionlist">
                {
                    transactions.map(TX => (
                        <Transaction key={TX.transID} TX={TX} />
                    ))
                }
            </div>
        </>
    )
}