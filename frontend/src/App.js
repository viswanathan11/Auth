import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Home from "./Component/Home";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
