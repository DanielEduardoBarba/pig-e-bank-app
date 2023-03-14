import { useEffect, useState } from "react"
import TransactionList from "../components/TransactionList"
import CreditInfo from "../components/CreditInfo"


export default function CreditLine({ account, modal, setModal, credit, setMarkForCreditPay, setMarkForCredit, markForAdmin, setMarkForAdmin }) {
    const [availableBalance, setAvailableBalance] = useState(0)
    const [pendingBalance, setPendingBalance] = useState(0)

    useEffect(() => {
        setAvailableBalance(credit.amount)
    }, [])

    return (
        <>
            <div className="CreditLine">

                <CreditInfo credit={credit} account={account} setModal={setModal} availableBalance={availableBalance} setMarkForCreditPay={setMarkForCreditPay} pendingBalance={pendingBalance} />

                <TransactionList
                    credit={credit}
                    setMarkForCredit={setMarkForCredit}
                    account={account}
                    setModal={setModal}
                    modal={modal}
                    setAvailableBalance={setAvailableBalance}
                    setPendingBalance={setPendingBalance}
                    markForAdmin={markForAdmin}
                    setMarkForAdmin={setMarkForAdmin} />

            </div>

        </>
    )
}