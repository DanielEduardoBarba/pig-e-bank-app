import Transaction from "../components/Transaction"
import { API_URL } from "../URLs"
import { useEffect, useState, useContext } from "react"
import { UserProvider } from "../App"

export default function Transactionlist({account, setModal, modal, setAvailableBalance,setPendingBalance, markForAdmin, setMarkForAdmin }) {
   const{userID, childID} = useContext(UserProvider)
    const [transactions, setTransactions] = useState([])

    useEffect(() => {

        fetch(`${API_URL}/transactions/${userID}/${childID}/${account}`)
            .then(incoming => incoming.json())
            .then(data => {
                
                console.log(data)
                console.log(calculateAccount(data))
                setTransactions(calculateAccount(data))
            })

        }, [modal, markForAdmin])


    const calculateAccount = (data) => {
        let approved = []
        let pending = []
        let pendingBalance=0
        let availableBalance=0
        for (let i = 0; i < data.length; i++) {
            
                if(data[i].isPending=="false"){
                    data[i].currentBalance=Number(data[i].amount)
                    try{
                        if(data[i - 1].currentBalance){
                            data[i].currentBalance = (Number(data[i].amount) + Number(data[i - 1].currentBalance)).toFixed(2)
                        }
                    }
                    catch{ }
                    availableBalance = data[i].currentBalance
                   // console.log(data[i].currentBalance)
                            approved.push(data[i])
                    }
                    else{
                        pendingBalance+=Number(data[i].amount)
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
            <div className="transactionlist">
                    <button onClick={() => setModal(1)} className="add-transaction"> Add Transaction</button>
                <div>
                    {
                        transactions.slice(0).reverse().map((TX) => (
                            <Transaction key={TX.transID} TX={TX} setMarkForAdmin={setMarkForAdmin} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}