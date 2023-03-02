import { initializeApp } from "firebase/app"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { useEffect } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyAe9lxdSMCdjXCd6z9C2Ln3eABwVyFlLD8",
    authDomain: "pig-e-bank-app.firebaseapp.com",
    projectId: "pig-e-bank-app",
    storageBucket: "pig-e-bank-app.appspot.com",
    messagingSenderId: "363998592448",
    appId: "1:363998592448:web:82f0bd653d9105a19a9c25"
  };

  const handleLogin = (setUserID) =>{
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth,provider)
    .then(_user=>{
        console.log(_user.user.uid)
        setUserID(_user.user.uid)
        localStorage.setItem("uid",_user.user.uid)
    })
    .catch(console.error)
}


export default function Login({setUserID}){

useEffect(()=>{
    // if(localStorage.getItem("uid")){
    //     const app = initializeApp(firebaseConfig)
    // const auth = getAuth(app)
    // const provider = new GoogleAuthProvider()

    // auth.
    // }
},[])


 
    return(
        <>
        <p>LOGIN</p>
        <button onClick={()=>handleLogin(setUserID)}>Sign In with GOOGLE</button>
        </>
    )
}