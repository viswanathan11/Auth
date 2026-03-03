import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const Signup = () => {
  const [signupInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);

    setSignUpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form action="">
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="name"
            value={signupInfo.name}
            placeholder="Enter your username"
            onChange={handleChange}
            autoFocus
          ></input>
        </div>
        <div>
          <label htmlFor="Email">Email: </label>
          <input
            type="text"
            id="Email"
            name="email"
            value={signupInfo.email}
            placeholder="Enter your Email"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="Password">Password: </label>
          <input
            type="text"
            id="Password"
            name="password"
            value={signupInfo.password}
            placeholder="Enter your Password"
            onChange={handleChange}
          ></input>
        </div>
        <div className="button">
          <button>Signup</button>
        </div>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
