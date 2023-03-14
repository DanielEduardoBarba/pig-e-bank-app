import { useEffect } from "react"


export default function ChoresProgressBar({ bar }) {

    useEffect(() => {
        document.documentElement.style.setProperty('--bar', '#000000')
    }, [])


    return (
        <>
            <div className="outer-progress-bar">
                <div className="inner-progress-bar"
                    style={{
                        width: `${bar}%`,
                        backgroundColor: `rgb(${100 / (bar / 100)},${bar / 100 * 255},0)`,
                        boxShadow: bar == 100 ? '0px 0px 20px 50px rgba(21, 255, 0, 1)' : ""
                    }} />
                % {bar ? bar : "0"} Complete</div>

        </>
    )

}