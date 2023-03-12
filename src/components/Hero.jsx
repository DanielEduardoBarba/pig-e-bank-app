import logo from "../assets/logo.png"

export default function Hero({tabName, setTab, setAccount, setChildID}){
    return(
        <>
        <div className="Hero">
               <p>{tabName}</p>
               <select style={{height: "50px", width:"200px"}} name="type" id="type" onChange={e => {
                        if(e.target.value=="checking") setTab(0)
                        if(e.target.value=="chores") setTab(1)
                        if(e.target.value=="savings") setTab(2)
                        if(e.target.value=="credit") setTab(3)
                        if(e.target.value=="metrics") setTab(4)
                       setAccount(e.target.value)
                    }}>
                        <option value="checking">Checking</option>
                        <option value="chores">Chores</option>
                        <option value="savings">Savings</option>
                        <option value="credit">Credit</option>
                        <option value="metrics">Charts</option>
                     </select>
        
               <img onClick={()=>setChildID("")} className="logo" src={logo} />
        </div>
        </>
    )
}