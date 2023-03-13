import { useState, useEffect, useContext} from "react"
import TransactionModal from "../components/TransactionModal"
import AdminModal from "../components/AdminModal"
import CreditLine from "../components/CreditLine"
import { UserProvider } from "../App"
import { API_URL } from "../URLs"
import TransferModal from "../components/TransferModal"
import AddCreditModal from "../components/AddCreditModal"
import "./Credit.css"


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

    },[modal])

    
    return (
        <>
            <div className="Credit">
            {
                creditLines.length>0
                    ? creditLines.map(credit=><CreditLine key={credit.ID} modal={modal} setModal={setModal} setMarkForCreditPay={setMarkForCreditPay} account={account} credit={credit} setMarkForCredit={setMarkForCredit} markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin}/>)
                    :""
            }
               <div className="credit-line-div">
               <button className="add-credit-line" onClick={()=>setModal(3)}/>
               </div>

            </div>
            {
                modal==1
                    ?<TransactionModal markForCredit={markForCredit} setMarkForCredit={setMarkForCredit} account={account} setModal={setModal}/>
                    : modal==2
                        ? <TransferModal availableBalance={markForCreditPay.availableBalance} markForCreditPay={markForCreditPay} setMarkForCredit={setMarkForCredit} account={markForCreditPay.account} setModal={setModal}/>
                        :modal==3
                            ? <AddCreditModal account={account} setModal={setModal} userID={userID} childID={childID}/>
                            :markForAdmin
                                ? <AdminModal account={account} markForAdmin={markForAdmin} setMarkForAdmin={setMarkForAdmin}/>
                                : ""
            }
        </>
    )
}