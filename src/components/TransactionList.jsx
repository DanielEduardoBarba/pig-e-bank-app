import Transaction from "../components/Transaction"
import { API_URL } from "../URLs"
import { useEffect, useState } from "react"

export default function Transactionlist({ setModal, modal, setBalance }) {
    const [transactions, setTransactions] = useState([])
    const [accountData, setAccountData] = useState([])
    const [lastAmount, setLastAmount] = useState(1)

    useEffect(() => {

        fetch(`${API_URL}/transactions`)
            .then(incoming => incoming.json())
            .then(data => {
                
                console.log(data)
                console.log(caculateAccount(data))
                setTransactions(caculateAccount(data))
            })

    }, [modal])


    const caculateAccount = (data) => {

        for (let i = 0; i < data.length; i++) {
            try{
                data[i].currentBalance=Number(data[i].amount)
                if(data[i - 1].currentBalance){
                data[i].currentBalance = Number(data[i].amount) + Number(data[i - 1].currentBalance)
                 }
              if(i == data.length-1) setBalance(data[i].currentBalance)
            }
            catch{

            }
        }
        return data
    }

    return (
        <>
            <div className="transactionlist">
                <div>
                    {
                        transactions.map((TX, index) => (
                            <Transaction key={TX.transID} TX={TX} index={index} transactions={transactions} lastAmount={lastAmount} setLastAmount={setLastAmount} />
                        ))
                    }
                </div>
                <button onClick={() => setModal(1)} className="add-transaction"> Add Transaction</button>
            </div>
        </>
    )
}