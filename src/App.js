import { useState, createContext, Provider } from 'react';
import Checking from './scenes/Checking';
import Login from './scenes/Login';
import './App.css';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Chores from './scenes/Chores';

export const UserProvider = createContext(null)

const tabName = ['Checking Account', 'Chores', 'Savings Account']

function App() {
  const [userID, setUserID] = useState("DsRNmKjspkZFjfBXZdJi2HHcXCP2")
  const [childID, setChildID] = useState("billthekiddo")
  const [account, setAccount] = useState("checking")
  const [tab, setTab] = useState(0)
  
  return (
    <>
      <UserProvider.Provider value={{ userID, setUserID, childID, setChildID }}>
        <div className='whole-page'>
          <Hero tabName={tabName[tab]} setAccount={setAccount} setTab={setTab} />
          {
            !userID
              ? <Login setUserID={setUserID} />
              : tab == 0
                ? <Checking account={account} setAccount={setAccount} userID={userID} />
                : tab == 1
                  ? <Chores userID={userID} />
                  : ""
          }
          <Footer />
          
        </div>
      </UserProvider.Provider>
    </>
  );
}

export default App;
