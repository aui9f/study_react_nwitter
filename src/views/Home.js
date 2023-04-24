import { useEffect, useState } from "react";
import { db, collection, addDoc, getDocs, doc, onSnapshot } from 'fbase';

const Home = ({useObj}) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    
    // 파이어스토어를 통한 데이터 출력
    // const getNweets = async () => {
    //     const dbNweets = await getDocs(collection(db, "nweets")); 
    //     dbNweets.forEach(x=>{
    //         const nweetObj = {...x.data(), id:x.id};
    //         setNweets(prev=>[nweetObj, ...prev]);
    //     })
    // }

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const docRef = await addDoc(collection(db, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: useObj.uid
            });
            console.log("Document written with ID: ", docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setNweet('');
    }

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value}
        } = event;
        setNweet(value);
    }

    useEffect(()=>{
        // getNweets();
        //실시간 데이터베이스 도입 (onSnapshot)
        
        onSnapshot(collection(db, "nweets"), (querySnapshot) => {
            const nweetsArr = [];
            querySnapshot.forEach((doc) => {
                nweetsArr.push(doc.data())
            });
            setNweets(nweetsArr)
        });
    }, []);

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="test" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="OK"/>
            </form>
            <hr/>
            <div>
                {nweets.map(x=>(
                    <div key={x.id}>
                        <p>{x.text || '-'}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
export default Home;