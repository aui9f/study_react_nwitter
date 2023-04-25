import {useEffect, useState} from 'react'
import AppRouter from 'components/Router'
import { auth, getAuth, onAuthStateChanged } from "fbase";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [useObj, setUserObj] = useState(null);
  
  useEffect(()=>{
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        
        setIsLoggedIn(user);
        setUserObj(user);
        // ...
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
      setInit(true);
    });


  },[]);

  const refreshUser = () => {
    
    
    setUserObj({...getAuth().currentUser});
    console.log(">>>", useObj)
  };

  return (
    <>
      {init?<AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(useObj)} useObj={useObj}/>:'initializing..'}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
