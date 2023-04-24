import { useEffect, useState } from "react";
import { db, collection, addDoc, getDocs, doc, onSnapshot,
    ref, getStorage, uploadString, getDownloadURL  } from 'fbase';
import Nweet from 'components/Nweet';

import { v4 as uuidv4 } from 'uuid';

const Home = ({useObj}) => {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attr, setAttr] = useState('');
    
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

        //고유식별자를 위해 UUID 라이브러리 설치
        //npm i uuid

        //사진 파일 유무와 상관없이 레퍼런스를 생성하는걸 방지
        let attachmentUrl = '';
        if(attachmentUrl!==''){
             // Create a root reference
            const storage = getStorage();
            const mountainsRef = ref(storage, `${useObj.uid}/${uuidv4()}`);
            const response = await uploadString(mountainsRef, attr, 'data_url');
            // const url = await getDownloadURL(ref(storage, `${useObj.uid}/${uuidv4()}`));
            attachmentUrl = await getDownloadURL(response.ref);
        }
      
       
          
        try {
            const docRef = await addDoc(collection(db, "nweets"), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: useObj.uid,
                attachmentUrl
            });
            console.log("Document written with ID: ", docRef);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        setNweet('');
        setAttr('');
          
        

    }

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: {value}
        } = event;
        setNweet(value);
    }

    const onFileChange = (event) => {
        const {
            target: {files}
        } = event;
        const theFile = files[0];
        const reader =new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result}
            } = finishedEvent;
            setAttr(result)
        }
        reader.readAsDataURL(theFile);
        // readAsDataURL 함수는 파일 정보를 인자로 받아서 파일 위치를 URL로 반환
        
    }
    const onClearAttr = () => {
        setAttr('')
    }

    useEffect(()=>{
        // getNweets();
        //실시간 데이터베이스 도입 (onSnapshot)
        
        onSnapshot(collection(db, "nweets"), (querySnapshot) => {
            const nweetsArr = [];
            querySnapshot.forEach((doc) => {
                nweetsArr.push({...doc.data(), id: doc.id})
            });
            setNweets(nweetsArr)
        });
    }, []);

    return (
        <>
            <form onSubmit={onSubmit}>

                <input type="test" value={nweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                {attr && <div><img src={attr} width="50px" height="50px"/><button onClick={onClearAttr}>Clear</button></div>}
                <input type="submit" value="OK"/>
            </form>
            <hr/>
            <div>
                {nweets.map(x=>(
                    // <div key={x.id}>
                    //     <p>{x.text || '-'}</p>
                    // </div>
                    <Nweet key={x.id} nweet={x} isUpdate={x.creatorId===useObj.uid}/>
                ))}
            </div>
        </>
    );
}
export default Home;