import { useContext, useState, useEffect } from "react"
import { UserProvider } from "../App"
import bear from "../assets/profile-emojis/1.png"
import whale from "../assets/profile-emojis/4.png"
import hog from "../assets/profile-emojis/5.png"
import cow from "../assets/profile-emojis/6.png"
import lion from "../assets/profile-emojis/8.png"
import dog from "../assets/profile-emojis/9.png"
import squeak from "../assets/squeaky-toy.wav"

export default function AcountInfo({ availableBalance, pendingBalance }) {
    const { childID } = useContext(UserProvider)
    const [select, setSelect] = useState()
    
    const amountOfSelect=6

    useEffect(()=>{
        setSelect(Math.floor((Math.random()*amountOfSelect)+1))
    },[])

    const togglePic = () =>{
        if(select<amountOfSelect)setSelect(select+1)
        else setSelect(1)
        new Audio(squeak).play()
    }

    return (
        <>
            <div className="AccountInfo">
                <img className="icon-photo"
                onClick={()=>togglePic()}
                    style={{ width: '100px',
                     height: '100px'
                     }}
                     src={
                        select==1
                            ?bear   
                            :select==2
                                ?whale
                                :select==3
                                    ?hog    
                                    :select==4
                                        ?dog    
                                        :select==5
                                            ?cow
                                            :select==6
                                                ?lion
                                                :""
                     }
                    />
                <p>Welcome back {childID}!</p>

                <p>Available: ${Number(availableBalance).toFixed(2) || "0.00"}</p>
                <p>Pending: ${Number(pendingBalance).toFixed(2) || "0.00"}</p>
                <p>Balance: ${(Number(pendingBalance) + Number(availableBalance)).toFixed(2) || "0.00"}</p>
            </div>
        </>
    )
}