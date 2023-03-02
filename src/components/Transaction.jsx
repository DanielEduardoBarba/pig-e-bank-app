export default function Transaction({TX}){
    
    return(
        <>
            <div className="transaction">
                <p>{TX.title}</p>
                <p>{TX.amount}</p>
            </div>
        </>
    )
}