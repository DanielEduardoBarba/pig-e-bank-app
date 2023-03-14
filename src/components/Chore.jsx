
export default function Chore({ CH, setMarkComplete, setMarkForAdmin }) {

    return (
        <>
            <div style={{ opacity: CH.isDone !== "false" ? "0.4" : "1" }} className="chore">

                <button className="admin-task-btn" onClick={() => {
                    CH.action = "chore"
                    setMarkForAdmin(CH)
                    console.log(CH)
                }} />

                <p className="chore-description">{CH.title}</p>

                <p className="chore-payout">Payout: ${CH.amount}</p>

                <button className="mark-task-btn" onClick={() => setMarkComplete(CH)} />
            </div>
            {

            }

        </>
    )

}
