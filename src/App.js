import { useState, createContext, Provider } from 'react';
import Checking from './scenes/Checking';
import Login from './scenes/Login';
import './App.css';

export const UserProvider = createContext(null)


function App() {
  const [userID, setUserID] = useState("DsRNmKjspkZFjfBXZdJi2HHcXCP2")

  return (
    <>
      <UserProvider.Provider value={{ userID, setUserID }}>
        <div className='whole-page'>
          {
            !userID
              ? <Login setUserID={setUserID} />
              : <Checking userID={userID} />
          }
        </div>
      </UserProvider.Provider>
    </>
  );
}

export default App;
