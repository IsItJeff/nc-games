import Header from './components/Header.component';
import UserLogin from './components/UserLogin.component';
import News from './components/News.component';
import MainNav from './components/Nav.component';
import Games from './components/Games.component';
import Profile from './components/Profile.component';
import CssBaseline from '@mui/material/CssBaseline';

import { Routes, Route } from "react-router-dom";
import { UserContext } from "./contexts/User.context.jsx";
import { useState} from "react";

import './App.css';

function App(props) {
  
  const [currentUser, setCurrentUser] = useState({})
  const [isLogin, setIsLogin] = useState(false)
  
  const UserAccess = ({ children }) => {
    return isLogin ? children : <UserLogin setCurrentUser={setCurrentUser} setIsLogin={setIsLogin}/>;
  }
  
  return (
    <UserContext.Provider value={currentUser}>
    <div className="App">
      <CssBaseline />
      <Header />
        <UserAccess>
          <MainNav />
          <Routes>
            <Route path="/:user/news" element={<News />} />
            <Route path="/:user/games" element={<Games />} />
            <Route path="/:user/profile" element={<Profile />} />
          </Routes>
        </UserAccess>
      </div>
    </UserContext.Provider>
  );
}

export default App;
