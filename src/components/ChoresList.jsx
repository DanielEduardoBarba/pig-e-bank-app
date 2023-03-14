import { useState, useEffect, useContext } from "react"
import { UserProvider } from "../App"
import ChoresProgressBar from "./ChoresProgressBar"
import Chore from "./Chore"
import { API_URL } from "../URLs"
import piggyBank from "../assets/piggy-bank.png"
import yay from "../assets/yay.wav"
import applause from "../assets/applause.wav"



export default function ChoresList({ modal, setModal, markComplete, setMarkComplete, markForAdmin, setMarkForAdmin }) {
    const [chores, setChores] = useState()
    const [bar, setBar] = useState(0)
    const { userID, childID } = useContext(UserProvider)

    useEffect(() => {

        try {
            let done = 0

            for (let i = 0; i < chores.length; i++) {
                if (chores[i].isDone !== "false") done++
                console.log(chores[i].isDone)
            }

            const progress = Math.floor((done / chores.length) * 100)

            setBar(progress)

            if (progress == 100) new Audio(yay).play()
            else if (progress >= 50) new Audio(applause).play()

        } catch { }

    }, [chores])

    useEffect(() => {

        fetch(`${API_URL}/chores/${userID}/${childID}`)
            .then(incoming => incoming.json())
            .then(data => setChores(data))
            .catch(console.error)
    }, [modal, markComplete, markForAdmin])

    return (
        <>
            <div className="choreslist">

                <button onClick={() => {
                    setModal(1)
                }} className="add-chore-btn" />
                {
                    chores
                        ? chores.map(CH => <Chore key={CH.choreID} CH={CH} setMarkComplete={setMarkComplete} setMarkForAdmin={setMarkForAdmin} />)
                        : ""
                }
            </div>

            <div className="progress-bar-div">
                <ChoresProgressBar bar={bar} chores={chores} />
            </div>

            <div style={{ width: `${10 + bar}%` }} className="animate-piggy">
                <img className="piggy-bank-icon" src={piggyBank} />
            </div>

        </>
    )
}