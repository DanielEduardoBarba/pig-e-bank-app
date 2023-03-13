
export default function Chore({CH, setMarkComplete, setMarkForAdmin}){
    
    return(
        <>
        <div style={{opacity:CH.isDone!=="false"?"0.4":"1"}} className="chore">

            <button className="admin-task-btn" onClick={()=>{
                CH.action="chore"
                setMarkForAdmin(CH)
                console.log(CH)
            }}/>
            <p>{CH.title}</p>
            <p>Payout: ${CH.amount}</p>
            {/* <p>{CH.isDone}</p> */}
            <button className="mark-task-btn" onClick={()=>setMarkComplete(CH)}/>
        </div>
        {
            
        }
       
        </>
    )

}
