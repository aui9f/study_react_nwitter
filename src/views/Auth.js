import { useState } from "react";

import { auth, getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'fbase'

const Auth = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [newAccount, setNewAccount] = useState(false);
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
    <div id="login-page">
      
      <form onSubmit={onSubmit}>
        <div className="logo icon i-logo"></div>
        <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required />
        <input type="password" name="pw" value={pw} placeholder="password" onChange={onChange} required />
        <input type="submit" value={newAccount?'회원가입':'로그인'}/>
        <p>{error}</p>
      </form>

      <div className="line">
        <div></div>
        <div><p>또는</p></div>
        <div></div>
      </div>
      {/* <span onClick={toggleAccount}>{newAccount?'로그인하기':'회원가입하기'}</span> */}


      <ul>
        <li onClick={onGoogleClick}><div className="icon i-google"></div><p>Google 로 로그인하기</p></li>
        <li><div className="icon i-apple"></div><p>Apple 로 로그인하기</p></li>
        <li><div className="icon i-naver"></div><p>Naver 로 로그인하기</p></li>
        <li><div className="icon i-kakao"></div><p>Kakao 로 로그인하기</p></li>
      </ul>

      <div className="signup">
        <p>계정이 없으신가요? <span>가입하기</span></p>
      </div>
    </div>
  )
};
export default Auth;