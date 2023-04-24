
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from '../views/Auth';
import Home from '../views/Home';
import Navigation from 'components/Navigation';
import Profile from 'views/Profile';

const AppRouter = ({isLoggedIn, useObj}) => {
    
    // v5: Redirect
    // v6: Navigate -- <Route path="*" element={<Navigate to="/" replace />}
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? 
                    (
                        <>
                            <Route path="/" element={<Home useObj={useObj} />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />
                        </>
                    )
                    :
                    (
                        <Route path="/" element={<Auth />} />
                        
                    )}
                    {/* <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            /> */}
                    
                    
            </Routes>
            
        </Router>

    )
  }

  export default AppRouter;