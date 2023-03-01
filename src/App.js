import { useState,useContext } from 'react';
import Checking from './scenes/Checking';
import Login from './scenes/Login';
import './App.css';

function App() {
  const[userID, setUserID] = useState("")
  return (
   <>
      {
        !userID
        ?<Login setUserID={setUserID}/>
        :<Checking userID={userID}/>
      }
   </>
  );
}

export default App;
