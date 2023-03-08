import { useState, useEffect } from "react"


export default function ChoresProgressBar({bar}){
    

    return(
        <>
        <div className="progress-bar">
            <div className="inner-progress-bar"
            style={{width:`${bar}%`}}>
                % {bar} Complete
                </div>
        </div>

        </>
    )

}