import { useEffect, useState, useContext } from "react"
import { UserProvider } from "../App"
import Transaction from "../components/Transaction"
import { API_URL } from "../URLs"

export default function Transactionlist({ credit, account, setModal, modal, setAvailableBalance, setPendingBalance, setMarkForCredit, markForAdmin, setMarkForAdmin }) {
    const { userID, childID } = useContext(UserProvider)
    const [transactions, setTransactions] = useState([])


    useEffect(() => {

        fetch(`${API_URL}/transactions/${userID}/${childID}/${(credit?.loanID) ? (credit?.loanID) : account}`)
            .then(incoming => incoming.json())
            .then(data => setTransactions(calculateAccount(data)))
            .catch(console.error)

    }, [modal, markForAdmin])


    const calculateInterest = (lastFeeTime, freq, data, i) => {

        const milliSecInDay = 86400000
        const milliSecInWeek = 604800000
        const milliSecInMonth = 2628000000
        const milliSecInYear = 31540000000

        let interestFeeTrans = {}

        try {
            if (lastFeeTime > data[i + 1]?.transID) return false

            let interestRateCharge = 0
            if (freq == "seconds") interestRateCharge = 1000
            if (freq == "daily") interestRateCharge = milliSecInDay
            else if (freq == "weekly") interestRateCharge = milliSecInWeek
            else if (freq == "monthly") interestRateCharge = milliSecInMonth
            else return false

            lastFeeTime += interestRateCharge

            let fee = (Number(data[i].currentBalance) * (Number(credit?.APR) * interestRateCharge / milliSecInYear))
            if (fee > -0.01) fee = -0.01
            fee = fee.toFixed(2)

            interestFeeTrans = {
                transID: lastFeeTime,
                account: credit.loanID,
                title: `Interest charge - Account: ${credit.loanID}`,
                isPending: "false",
                amount: String(fee),
                currentBalance: String(Number(fee) + Number(data[i].currentBalance))
            }


            return interestFeeTrans


        } catch {

        }

    }

    const calculateAccount = (data) => {
        let approved = []
        let pending = []
        let pendingBalance = 0
        let availableBalance = 0

        let lastFeeTime = 0

        if (account !== "checking" && account !== "savings") availableBalance = Number(credit.amount)
        for (let i = 0; i < data.length; i++) {

            if (data[i].isPending == "false") {
                data[i].currentBalance = Number(data[i].amount)
                try {
                    if (data[i - 1].currentBalance) {
                        data[i].currentBalance = (Number(data[i].amount) + Number(credit?.frequency ? interestFeeTrans.currentBalance : data[i - 1].currentBalance)).toFixed(2)
                    }
                }
                catch { }
                availableBalance += Number(data[i].amount)
                approved.push(data[i])

                const interestFeeTrans = calculateInterest(lastFeeTime, credit?.frequency, data, i)
                lastFeeTime = interestFeeTrans.transID

                if (interestFeeTrans) approved.push(interestFeeTrans)



            }
            else {
                pendingBalance += Number(data[i].amount)
                pending.push(data[i])
            }

            if (i == data.length - 1) {
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

                    <button onClick={() => {
                        if (account == "credit") setMarkForCredit(credit)
                        setModal(1)
                    }} className="add-transaction"> Add Transaction</button>

                    {
                        account == "checking" || account == "savings"
                            ? <button onClick={() => setModal(2)} className="make-transfer">Transfer</button>
                            : ""
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