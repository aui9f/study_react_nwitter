import {auth, signOut, db, collection, query, where, orderBy, getDocs} from 'fbase'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({useObj}) => {

    const [myNweet, setMyNweet] = useState([]);

    const navigate = useNavigate();

    const onLogoutClick = () => {
        
        signOut(auth).then(() => {
        // Sign-out successful.
        navigate('/');
        }).catch((error) => {
        // An error happened.
        });
    }

    const getMyNweets = async () => {
        const citiesRef = await collection(db, "nweets");

        const q = await query(citiesRef, 
            where("creatorId", "==", useObj.uid),
            orderBy('createdAt', 'asc')
        );
        
        const querySnapshot = await getDocs(q);
        let arr = [];
        querySnapshot.forEach((doc) => {
            arr.push(doc.data())
        });
        setMyNweet(arr);
        

    }

    // 'useEffect(()=>{},[])' Profile 컴포넌트가 렌더링 된 이후 
    // useEffect의 첫번째 인자로 넘겨준 함수가 실행
    useEffect(()=>{
        getMyNweets();
    },[])

    return (
        <>
            <span>Profile</span>
            <button onClick={onLogoutClick}>Logout</button>
            <hr />
            <ul>
                {myNweet.map(x=>(<><li>{x.text}</li></>))}
            </ul>
        </>
    )
}
export default Profile;