import { useState } from "react"
import AccountInfo from "../components/AccountInfo"
import TransactionList from "../components/TransactionList"
import TransactionModal from "../components/TransactionModal"
import AdminModal from "../components/AdminModal"
import TransferModal from "../components/TransferModal"
import "./Checking.css"

export default function Checking({ account}) {
    const [modal, setModal] = useState(0)
    const [availableBalance, setAvailableBalance] = useState(0)
    const [pendingBalance, setPendingBalance] = useState(0)
    const [markForAdmin, setMarkForAdmin] = useState("")

    return (
        <>
            <div className="Checking">

                <AccountInfo availableBalance={availableBalance} pendingBalance={pendingBalance} />

                <TransactionList account={account} setModal={setModal}
                    modal={modal}
                    setAvailableBalance={setAvailableBalance}
                    setPendingBalance={setPendingBalance}
                    markForAdmin={markForAdmin}
                    setMarkForAdmin={setMarkForAdmin} />

            </div>
            {
                modal == 1
                    ? <TransactionModal account={account} setModal={setModal} />
                    : modal == 2
                        ? <TransferModal availableBalance={availableBalance} account={account} setModal={setModal} />
                        : markForAdmin
                            ? <AdminModal account={account} markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin} />
                            : ""
            }
        </>
    )
}