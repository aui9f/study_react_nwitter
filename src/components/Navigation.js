import {Link} from 'react-router-dom';

const Navigation = ({userObj}) => {
    return (
        <nav>
            <ul>
                <li className='logo'></li>
                <li className="home">
                    <Link to="/"></Link>
                </li>
                <li className='notice'></li>
                
                <li className="tweet"></li>
                <li className="profile">
                    <Link to="/profile"></Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;