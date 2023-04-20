import {auth, signOut} from 'fbase'
import { useNavigate } from 'react-router-dom';

const Profile = () => {


    const navigate = useNavigate();

    const onLogoutClick = () => {
        
        signOut(auth).then(() => {
        // Sign-out successful.
        navigate('/');
        }).catch((error) => {
        // An error happened.
        });
    }

    return (
        <>
            <span>Profile</span>
            <button onClick={onLogoutClick}>Logout</button>
        </>
    )
}
export default Profile;