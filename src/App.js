import { useState, createContext, Provider } from 'react';
import Checking from './scenes/Checking';
import Login from './scenes/Login';
import './App.css';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Chores from './scenes/Chores';
import Savings from './scenes/Savings'
import Credit from './scenes/Credit'
import Metrics from './scenes/Metrics';

export const UserProvider = createContext(null)

const tabName = ['Checking Account', 'Chores', 'Savings Account', 'Credit', 'Charts']

function App() {
  // const [childID, setChildID] = useState("")
  // const [userID, setUserID] = useState("")
  const [childID, setChildID] = useState("jimbokimbo")
  const [userID, setUserID] = useState("DsRNmKjspkZFjfBXZdJi2HHcXCP2")
  const [account, setAccount] = useState("credit")
  const [tab, setTab] = useState(3)
  
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
                      ? <Credit account={account} setAccount={setAccount} userID={userID} />
                      :tab==4
                        ? <Metrics userID={userID} childID={childID}/>
                        :""
          }
          <Footer />
          
        </div>
      </UserProvider.Provider>
    </>
  );
}

export default App;
