import Header from './components/Header.component';
import UserLogin from './components/UserLogin.component';
import MainNav from './components/Nav.component';

import CssBaseline from '@mui/material/CssBaseline';
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
        </UserAccess>
      </div>
    </UserContext.Provider>
  );
}

export default App;
