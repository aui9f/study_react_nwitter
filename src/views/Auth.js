import { useState } from "react";

import { auth, getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'fbase'

const Auth = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = event => {
    const {name, value} = event.target;
    if(name==='email'){
      setEmail(value);
    }
    if(name==='pw'){
      setPw(value);
    }
  }

  const toggleAccount = () => {
    setNewAccount(prev=>!prev);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const auth = getAuth();
      if(newAccount){
        console.log("[email, pw]", email, pw)
        await createUserWithEmailAndPassword(auth, email, pw);
      }else{

        //로그인
        signInWithEmailAndPassword(auth, email, pw).then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
  
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
      }
    } catch (error) {
      console.log("error", error.message)
      setError(error.message)
    }
    
  }

  const onGoogleClick = async() => {
    const provider = new GoogleAuthProvider();  
    const auth = getAuth();
    const test = await signInWithPopup(auth, provider);
    console.log(test)

  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required />
        <input type="password" name="pw" value={pw} placeholder="password" onChange={onChange} required />
        <input type="submit" value={newAccount?'회원가입':'로그인'}/>
        <p>{error}</p>
      </form>
      <span onClick={toggleAccount}>{newAccount?'로그인하기':'회원가입하기'}</span>


      <div>
        <button name="google" onClick={onGoogleClick}>Continue with Google</button>
      </div>
    </div>
  )
};
export default Auth;