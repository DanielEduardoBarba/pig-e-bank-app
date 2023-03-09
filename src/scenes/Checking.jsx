import { useState } from "react"
import AccountInfo from "../components/AccountInfo"
import "./Checking.css"
import TransactionList from "../components/TransactionList"
import TransactionModal from "../components/TransactionModal"
import AdminModal from "../components/AdminModal"

export default function Checking({ account, setAccount,userID }) {
    const [modal, setModal] = useState(0)
    const [balance, setBalance] = useState(0)
    const [markForAdmin, setMarkForAdmin] = useState("")

    return (
        <>
            <div className="Checking">

                <AccountInfo balance={balance}/>
                <TransactionList account={account} setModal={setModal} 
                modal={modal} setBalance={setBalance} 
                setMarkForAdmin={setMarkForAdmin}/>

            </div>
            {
                modal==1
                    ? <TransactionModal account={account} setModal={setModal}/>
                    : markForAdmin
                        ? <AdminModal markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin}/>
                        : ""
            }
        </>
    )
}