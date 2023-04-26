
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from '../views/Auth';
import Home from '../views/Home';
import Navigation from 'components/Navigation';
import Profile from 'views/Profile';

const AppRouter = ({isLoggedIn, useObj, refreshUser}) => {
    
    // v5: Redirect
    // v6: Navigate -- <Route path="*" element={<Navigate to="/" replace />}
    return (
        <div id="page">
            <Router>
                {isLoggedIn && <Navigation userObj={useObj}/>}
                <div className="routes-page">
                <Routes>
                    {isLoggedIn ? 
                        (
                            <>
                                <Route path="/" element={<Home useObj={useObj} />} />
                                <Route path="/profile" element={<Profile refreshUser={refreshUser} useObj={useObj} />} />
                                <Route
                                path="*"
                                element={<Navigate to="/" userObj={useObj} replace />}
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
                </div>
                
            </Router>
        </div>

    )
  }

  export default AppRouter;