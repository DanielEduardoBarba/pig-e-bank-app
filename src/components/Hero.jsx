import logo from "../assets/logo.png"

export default function Hero({tabName, setTab, setAccount}){
    return(
        <>
        <div className="Hero">
               <p>{tabName}</p>

               <button onClick={()=>{
                setTab(0)
                setAccount("checking")
                }}>Checking</button>

               <button onClick={()=>{
                setTab(1)
                setAccount("chores")
                }}>Chores</button>

               <button onClick={()=>{
                setTab(2)
                setAccount("savings")
                }}>Savings</button>

               <button onClick={()=>{
                setTab(3)
                setAccount("credit")
                }}>Credit</button>

               <img className="logo" src={logo} />
        </div>
        </>
    )
}