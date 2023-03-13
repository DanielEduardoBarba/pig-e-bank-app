import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react";
import "./Login.css"
import ChildLoginSection from "../components/ChildLoginSection";
import { API_URL } from "../URLs";
import NewChildSection from "../components/NewChildSection";
import ParentAccountSection from "../components/ParentAccountSection";
import logo from "../assets/logo.png"
import oink from "../assets/oink.wav"
import lookingLogo from "../assets/looking-logo.png"

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
            console.log(_user)
            setUserID(_user.user.uid)
            localStorage.setItem("uid", _user.user.uid)
        })
        .catch(console.error)
}


export default function Login({ userID, setUserID, childID, setChildID }) {
    const [children, setChildren] = useState("")
    const [error, setError] = useState("")
    const [newChild, setNewChild] = useState(0)
    const [parentModal,setParentModal] = useState(0)

    useEffect(() => {
        if (localStorage.getItem("uid")) setUserID(localStorage.getItem("uid"))
    }, [])

    useEffect(() => {
        if (userID) {
            fetch(`${API_URL}/children/${userID}`)
                .then(incoming => incoming.json())
                .then(data => {
                    setChildren(data)
                    console.log(data)
                })
                .catch(console.error)
        }

    }, [userID, newChild, parentModal])

    return (
        <>
            <div className='blurr-background' onClick={()=>{
               setParentModal(0)
               setError("LOGIN")
            }}/>
            <div className="Login">
                <p>{error || "LOGIN"}</p>
                <img onClick={()=>{
                     new Audio(oink).play()
                     setParentModal(1)
                }} className="looking-logo-down" src={lookingLogo}/>
                <div className="login-form">
                {
                    parentModal
                    ?<ParentAccountSection handleLogin={handleLogin} userID={userID} setUserID={setUserID} setChildID={setChildID} setChildren={setChildren}/>
                    :""
                }
                    {
                    userID && !children.length
                        ?<NewChildSection setParentModal={setParentModal} setNewChild={setNewChild} setError={setError} children={children} userID={userID} setChildID={setChildID}/>
                        :userID && children
                            ?<ChildLoginSection setError={setError} children={children} userID={userID} setChildID={setChildID} />
                            : ""
                }
                </div>
                
            </div>
                <img className="parent-modal-btn" src={logo} onClick={()=>{
                    new Audio(oink).play()
                    setParentModal(1)
                }} />
        </>
    )
}