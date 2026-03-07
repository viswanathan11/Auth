import React,{useState} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Home from "./Component/Home";
import "./App.css";
import RefreshHandler from "./RefreshHandler";
function App() {
  const[isAuthenticated ,setIsAuthenticate]=useState(false);
  
  const PrivateRoute=({element})=>{
    return isAuthenticated?element:<Navigate to="/login"/>
  }
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticate }/>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </div>
  );
}

export default App;
