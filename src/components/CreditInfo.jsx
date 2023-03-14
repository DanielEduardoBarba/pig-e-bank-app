
export default function CreditInfo({ credit, setModal, account, availableBalance, setMarkForCreditPay, pendingBalance }) {

    return (
        <>
            <div className="CreditInfo">

                <p>Credit ID: {credit.loanID}</p>

                <p>Available: ${Number(availableBalance).toFixed(2) || "0.00"}</p>

                <p>Balance: ${(Number(credit?.amount) - Number(pendingBalance) - Number(availableBalance)).toFixed(2) || "0.00"}</p>

                <p>APR: %{String(Number(credit.APR)*100) || "NA"}</p>

                <button className="pay-credit-btn" onClick={() => {
                    const markThisCreditLine = {
                        account,
                        availableBalance,
                        loanID: credit.loanID
                    }
                    setMarkForCreditPay(markThisCreditLine)
                    setModal(2)
                }}>Pay</button>

            </div>
        </>
    )
}