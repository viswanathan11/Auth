import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../util";
const Signup = () => {
  const [signupInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nvigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name} : ${value}`);

    setSignUpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError("name, email and password are required");
    }

    try {
      const url = `${process.env.REACT_APP_API_URL}/api/signup`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const res = await response.json();
     
      const { message, success, error } = res;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          nvigate("/login");
        }, 1000);
        return;
      } else if (error) {
        return handleError(error.details[0].message);
      } else if (!success) {
        return handleError(error.details[0].message);
      }
    } catch (err) {
      return handleError(err);
    }
  };
  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
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
            type="password"
            id="Password"
            name="password"
            value={signupInfo.password}
            placeholder="Enter your Password"
            onChange={handleChange}
          ></input>
        </div>
        <div className="button">
          <button className="submitbtn" type="submit">
            Signup
          </button>
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
