import { useState, useEffect, useContext} from "react"
import TransactionModal from "../components/TransactionModal"
import AdminModal from "../components/AdminModal"
import CreditLine from "../components/CreditLine"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"
import "./Checking.css"
import TransferModal from "../components/TransferModal"


export default function Savings({ account, setAccount }) {
    const [modal, setModal] = useState(0)
    const [balance, setBalance] = useState(0)
    const [markForAdmin, setMarkForAdmin] = useState("")
    const [creditLines, setCreditLine] = useState("")
    const [markForCreditPay, setMarkForCreditPay] = useState("")
    const [markForCredit, setMarkForCredit] = useState("")
    const {userID, childID} = useContext(UserProvider)


    useEffect(()=>{
        fetch(`${API_URL}/credit/${userID}/${childID}`)
            .then(incoming => incoming.json())
            .then(data => {
                console.log(data)
                setCreditLine(data)
            })
            .catch(console.error)

    },[])

    return (
        <>
            <div className="Credit">


            {
                creditLines
                    ? creditLines.map(credit=><CreditLine key={credit.ID} modal={modal} setModal={setModal} setMarkForCreditPay={setMarkForCreditPay} account={account} credit={credit} setMarkForCredit={setMarkForCredit} markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin}/>)
                    :"Ask your parents about a credit line :) ..."
            }
                

            </div>
            {
                modal==1
                    ?<TransactionModal markForCredit={markForCredit} setMarkForCredit={setMarkForCredit} account={account} setModal={setModal}/>
                    : modal==2
                        ? <TransferModal availableBalance={markForCreditPay.availableBalance} markForCreditPay={markForCreditPay} account={markForCreditPay.account} setModal={setModal}/>
                        :markForAdmin
                            ? <AdminModal account={account} markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin}/>
                            : ""
            }
        </>
    )
}