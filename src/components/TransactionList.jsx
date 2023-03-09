import Transaction from "../components/Transaction"
import { API_URL } from "../URLs"
import { useEffect, useState } from "react"

export default function Transactionlist({ setModal, modal, setBalance, setMarkForAdmin }) {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {

        fetch(`${API_URL}/transactions`)
            .then(incoming => incoming.json())
            .then(data => {
                
                console.log(data)
                console.log(calculateAccount(data))
                setTransactions(calculateAccount(data))
            })

        }, [modal])


    const calculateAccount = (data) => {
        let approved = []
        let pending = []
        for (let i = 0; i < data.length; i++) {
            try{
                if(data[i].isPending=="false"){

                         data[i].currentBalance=Number(data[i].amount)
                         if(data[i - 1].currentBalance){
                              data[i].currentBalance = (Number(data[i].amount) + Number(data[i - 1].currentBalance)).toFixed(2)
                          }
                          approved.push(data[i])
                }
                else pending.push(data[i])
              if(i == data.length-1) setBalance(data[i].currentBalance)
            }
            catch{

            }
        }
        return [...approved, ...pending]
    }

    return (
        <>
            <div className="transactionlist">
                <div>
                    {
                        transactions.map((TX) => (
                            <Transaction key={TX.transID} TX={TX} setMarkForAdmin={setMarkForAdmin} />
                        ))
                    }
                </div>
                <button onClick={() => setModal(1)} className="add-transaction"> Add Transaction</button>
            </div>
        </>
    )
}