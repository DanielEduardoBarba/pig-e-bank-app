

export default function ParentAccountSection({ userID, handleLogin, setChildID, setUserID, setChildren }) {

    return (
        <>
            {
                userID
                    ? <button onClick={() => {
                        localStorage.clear("uid")
                        setChildID("")
                        setUserID("")
                    }}>Disconnect Parent</button>
                    : ""
            }
            {
                !userID
                    ? <button className="google-btn" onClick={() => handleLogin(setUserID)} />
                    : ""
            }
            {
                userID
                    ? <button onClick={() => { setChildren("") }}>Create Child Account</button>
                    : ""
            }


        </>
    )
}