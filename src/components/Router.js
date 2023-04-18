import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from '../views/Auth';
import Home from '../views/Home';

const AppRouter = ({isLoggedIn}) => {
    
    return (
        <Router>
            <Routes>
                {isLoggedIn ? 
                    (
                        <Route path="/" element={<Home />} />
                        // <Route exact path="/"><Home/></Route>
                    )
                    :
                    (
                        <Route path="/" element={<Auth />} />
                        // <Route exact path="/"><Auth/></Route>  
                    )}
            </Routes>
        </Router>

    )
  }

  export default AppRouter;