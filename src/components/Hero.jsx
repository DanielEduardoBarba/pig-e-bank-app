import logo from "../assets/logo.png"
import pigSqueak from "../assets/pig-squeak.wav"


export default function Hero({ tabName, setTab, setAccount, setChildID }) {
    return (
        <>
            <div className="Hero">

                <img onClick={() => {
                    new Audio(pigSqueak).play()
                    setChildID("")
                }} className="logo" src={logo} />

                <p>{tabName}</p>

                <select style={{ height: "50px", width: "200px" }} name="scene-select" id="scene-select" onChange={e => {
                    if (e.target.value == "checking") setTab(0)
                    if (e.target.value == "chores") setTab(1)
                    if (e.target.value == "savings") setTab(2)
                    if (e.target.value == "credit") setTab(3)
                    if (e.target.value == "metrics") setTab(4)
                    setAccount(e.target.value)
                }}>
                    <option value="checking">Checking</option>
                    <option value="chores">Chores</option>
                    <option value="savings">Savings</option>
                    <option value="credit">Credit</option>
                    <option value="metrics">Charts</option>
                </select>

            </div>
        </>
    )
}