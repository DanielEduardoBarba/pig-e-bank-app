import logo from "../assets/logo.png"

export default function Hero({tabName}){
    return(
        <>
        <div className="Hero">
               <p>{tabName}</p>
               <img className="logo" src={logo} />
        </div>
        </>
    )
}