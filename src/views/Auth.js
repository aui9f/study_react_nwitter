import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
    let data;
    
    try {
      const auth = getAuth();
      if(newAccount){
        console.log("[email, pw]", email, pw)
        data = await createUserWithEmailAndPassword(auth, email, pw);
        console.log('[data] ',data)
      }else{
        //로그인
      }
    } catch (error) {
      console.log("error", error.message)
      setError(error.message)
    }
    
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
        <button>Continue with Google</button>
      </div>
    </div>
  )
};
export default Auth;