import Header from './components/Header.component';
import UserLogin from './components/UserLogin.component';
import MainNav from './components/Nav.component';

import CssBaseline from '@mui/material/CssBaseline';

// import { UserContext } from "./contexts/User.context.jsx";
// import { useState, useContext } from "react";

import './App.css';


function App() {

  
  return (
    // <UserContext.Provider value="">
    <div className="App">
      <CssBaseline />
      <Header />
      <UserLogin />
      <MainNav />
      </div>
    // </UserContext.Provider>
  );
}

export default App;
