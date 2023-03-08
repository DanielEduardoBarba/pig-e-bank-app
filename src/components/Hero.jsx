import logo from "../assets/logo.png"

export default function Hero({tabName, setTab}){
    return(
        <>
        <div className="Hero">
               <p>{tabName}</p>
               <button onClick={()=>{setTab(0)}}>Checking</button>
               <button onClick={()=>{setTab(1)}}>Chores</button>
               <button onClick={()=>{setTab(2)}}>Savings</button>
               <img className="logo" src={logo} />
        </div>
        </>
    )
}