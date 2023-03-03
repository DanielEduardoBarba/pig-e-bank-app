import { useState, createContext, Provider } from 'react';
import Checking from './scenes/Checking';
import Login from './scenes/Login';
import './App.css';
import Footer from './components/Footer';
import Hero from './components/Hero';

export const UserProvider = createContext(null)


function App() {
  const [userID, setUserID] = useState("DsRNmKjspkZFjfBXZdJi2HHcXCP2")
  const [childID, setChildID] = useState("billthekiddo")

  return (
    <>
      <UserProvider.Provider value={{ userID, setUserID, childID,setChildID}}>
        <div className='whole-page'>
        <Hero/>
            {
            !userID
              ? <Login setUserID={setUserID} />
              : <Checking userID={userID} />
            }
          <Footer/>
        </div>
      </UserProvider.Provider>
    </>
  );
}

export default App;
