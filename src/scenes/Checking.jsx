import { useState, useEffect } from "react"
import AccountInfo from "../components/AccountInfo"
import "./Checking.css"
import Transactionlist from "../components/TransactionList"
import TransactionModal from "../components/TransactionModal"

export default function Checking({ userID }) {
    const [modal, setModal] = useState(0)
    const [balance, setBalance] = useState(0)

    return (
        <>
            <div className="Checking">

                <AccountInfo balance={balance}/>
                <Transactionlist setModal={setModal} modal={modal} setBalance={setBalance}/>

            </div>
            {
                modal
                    ? <TransactionModal setModal={setModal}/>
                    : ""
            }
        </>
    )
}