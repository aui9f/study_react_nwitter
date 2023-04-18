import {useEffect, useState} from 'react'
import AppRouter from 'components/Router'
import { auth, onAuthStateChanged } from "fbase";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  useEffect(()=>{
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("user", user)
        setIsLoggedIn(user);
        // ...
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });


  },[]);
  return (
    <>
      {init?<AppRouter isLoggedIn={isLoggedIn}/>:'initializing..'}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
