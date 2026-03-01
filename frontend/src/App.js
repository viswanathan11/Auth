import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import "./App.css";
import Home from "./Component/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
