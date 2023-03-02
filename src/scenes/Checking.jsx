import { useState, useEffect } from "react"
import Hero from "../components/Hero"
import AccountInfo from "../components/AccountInfo"
import Footer from "../components/Footer"
import { API_URL } from "../URLs"
import "./Checking.css"
import Transactionlist from "../components/TransactionList"


export default function Checking({userID}){


    return(
        <>
        <Hero/>
        <AccountInfo />
        <Transactionlist/>
        <Footer/>
        </>
    )
}