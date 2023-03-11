import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react";
import "./Login.css"
import ChildLoginSection from "../components/ChildLoginSection";
import { API_URL } from "../URLs";

const firebaseConfig = {
    apiKey: "AIzaSyAe9lxdSMCdjXCd6z9C2Ln3eABwVyFlLD8",
    authDomain: "pig-e-bank-app.firebaseapp.com",
    projectId: "pig-e-bank-app",
    storageBucket: "pig-e-bank-app.appspot.com",
    messagingSenderId: "363998592448",
    appId: "1:363998592448:web:82f0bd653d9105a19a9c25"
};

const handleLogin = (setUserID) => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
        .then(_user => {
            console.log(_user.user.uid)
            setUserID(_user.user.uid)
            localStorage.setItem("uid", _user.user.uid)
        })
        .catch(console.error)
}


export default function Login({ userID, setUserID, childID, setChildID }) {
    const [children, setChildren] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if (localStorage.getItem("uid")) setUserID(localStorage.getItem("uid"))
    }, [])
    useEffect(() => {
        if (userID) {
            fetch(`${API_URL}/children/${userID}`)
                .then(incoming => incoming.json())
                .then(data => {
                    setChildren(data)
                })
                .catch(console.error)
        }

    }, [userID])



    return (
        <>
            <div className='blurr-background' />
            <div className="Login">
                <div className="login-form">

                <p>{error || "LOGIN"}</p>
                {
                    userID
                        ? <button onClick={() => {
                            localStorage.clear("uid")
                            setUserID("")
                        }}>Disconnect Account</button>
                        : ""
                }
                <button className="google-btn" onClick={() => handleLogin(setUserID)} />
                {

                    userID && children
                        ? <ChildLoginSection setError={setError} children={children} userID={userID} setChildID={setChildID} />
                        : ""
                }
                </div>


            </div>
        </>
    )
}