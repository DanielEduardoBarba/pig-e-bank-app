import { useState, useEffect } from "react"
import AccountInfo from "../components/AccountInfo"
import "./Checking.css"
import Transactionlist from "../components/TransactionList"
import Modal from "../components/Modal"

export default function Checking({ userID }) {
    const [modal, setModal] = useState(0)

    return (
        <>
            <div className="Checking">

                <AccountInfo />
                <Transactionlist setModal={setModal} modal={modal}/>

            </div>
            {
                modal
                    ? <Modal setModal={setModal}/>
                    : ""
            }
        </>
    )
}