import { useState, useEffect, useContext } from "react"
import { API_URL } from "../URLs"
import Chore from "./Chore"
import ChoresProgressBar from "./ChoresProgressBar"
import { UserProvider } from "../App"

export default function ChoresList({ modal, setModal, markComplete, setMarkComplete, markForAdmin, setMarkForAdmin }) {
    const [chores, setChores] = useState()
    const [bar, setBar] = useState(0)
    const{userID, childID} = useContext(UserProvider)

    useEffect(() => {

        try {
            let done = 0
            for (let i = 0; i < chores.length; i++) {
                if (chores[i].isDone !== "false") done++
                console.log(chores[i].isDone)
            }
            setBar(Math.floor((done / chores.length) * 100))

        } catch { }

    }, [chores])

    useEffect(() => {

        fetch(`${API_URL}/chores/${userID}/${childID}`)
            .then(incoming => incoming.json())
            .then(data => {

                setChores(data)
                console.log(data)

            })
            .catch(console.error)
    }, [modal, markComplete, markForAdmin])

    return (
        <>
            <div className="choreslist">
                <button onClick={()=>{
                          setModal(1)
                       }} className="add-chore-btn"/>
                {
                    chores
                        ? chores.map(CH => <Chore key={CH.choreID} CH={CH} setMarkComplete={setMarkComplete} setMarkForAdmin={setMarkForAdmin} />)
                        : ""
                }
            </div>
            <div className="progress-bar-div">
                <ChoresProgressBar bar={bar} chores={chores} />
            </div>
             

        </>
    )
}