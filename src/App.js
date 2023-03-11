import { useState, createContext, Provider } from 'react';
import Checking from './scenes/Checking';
import Login from './scenes/Login';
import './App.css';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Chores from './scenes/Chores';
import Savings from './scenes/Savings'
import Loans from './scenes/Loans'

export const UserProvider = createContext(null)

const tabName = ['Checking Account', 'Chores', 'Savings Account', 'Credit']

function App() {
  const [childID, setChildID] = useState("")
  const [userID, setUserID] = useState("")
  // const [childID, setChildID] = useState("billthekiddo")
  // const [userID, setUserID] = useState("DsRNmKjspkZFjfBXZdJi2HHcXCP2")
  const [account, setAccount] = useState("chores")
  const [tab, setTab] = useState(1)
  
  return (
    <>
      <UserProvider.Provider value={{ userID, setUserID, childID, setChildID }}>
        <div className='whole-page'>
          <Hero tabName={tabName[tab]} setAccount={setAccount} setTab={setTab} setChildID={setChildID}/>
          {
            !userID || !childID
              ? <Login userID={userID} setUserID={setUserID} childID={childID} setChildID={setChildID}/>
              : tab == 0
                ? <Checking account={account} setAccount={setAccount} userID={userID} />
                : tab == 1
                  ? <Chores account={account} setAccount={setAccount} userID={userID} />
                  : tab==2
                    ? <Savings account={account} setAccount={setAccount} userID={userID} />
                    : tab==3
                      ? <Loans account={account} setAccount={setAccount} userID={userID} />
                      :""
          }
          <Footer />
          
        </div>
      </UserProvider.Provider>
    </>
  );
}

export default App;
