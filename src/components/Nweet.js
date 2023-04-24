import {db, doc, deleteDoc, updateDoc, ref, storage, deleteObject} from 'fbase';
import { useState } from 'react';

const Nweet = ({nweet, isUpdate}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweet.text);

    const deleteNweet = async () => {
        if(window.confirm('삭제하시겠습니까?')){
            await deleteDoc(doc(db, 'nweets', nweet.id));
            if(nweet.attachmentUrl){
                
                

                // Create a reference to the file to delete
                const desertRef = ref(storage, nweet.attachmentUrl);

                // Delete the file
                deleteObject(desertRef).then(() => {
                // File deleted successfully
                }).catch((error) => {
                // Uh-oh, an error occurred!
                });
            }
            

        }
    };

    const onChange = (event) => {
        const {target: {value}} = event;
        setNewNweet(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        
        await updateDoc(doc(db, 'nweets', nweet.id), {
            text: newNweet
        });
        setEditing(false);
        setNewNweet('');

    }

    const toggleEditing = () => setEditing(prev=>!prev);

    return (
       <div>
           {editing?(
           <form onSubmit={onSubmit}>
               <input type="text" value={newNweet} onChange={onChange} required/>
               <button onClick={toggleEditing}>Cancel</button>
               <input type="submit" value="Update"/>
           </form>):(
            <div>   
                <h5>- {nweet.text}</h5>
                {nweet.attachmentUrl && (<img src={nweet.attachmentUrl} width="120px" height="120px"/>)}
            
                {isUpdate && (
                    <>
                        <button onClick={toggleEditing}>Edit</button>
                        <button onClick={deleteNweet}>DELETE</button>
                    </>
                )}
            </div>
           )}
       </div>
    )
}

export default Nweet;