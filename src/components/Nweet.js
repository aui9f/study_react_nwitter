import {db, doc, deleteDoc} from 'fbase';

const Nweet = ({nweet, isUpdate}) => {

    const deleteNweet = async () => {
        if(window.confirm('삭제하시겠습니까?')){
            await deleteDoc(doc(db, 'nweets', nweet.id));
            

        }
    };

    return (
        <div>
            <h5>- {nweet.text}</h5>
            {isUpdate && (
                <>
                    <button >Edit</button>
                    <button onClick={deleteNweet}>DELETE</button>
                </>
            )}
        </div>
    )
}

export default Nweet;