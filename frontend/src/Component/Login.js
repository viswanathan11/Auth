import React, { useState } from "react";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChanges = (e) => {
    console.log(loginInfo);
    setLoginInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    try {
      if (!email || !password) {
        handleError("Email and Password cannot be Empty");
        return;
      }

      if (!email.includes("@")) {
        handleError("Email must include @");
        return;
      }
      if (password.length < 4) {
        handleError("Password must be atleast 4 characters");
        return;
      }

      const login = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const response = await login.json();
      const { success, message, token, name } = response;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error)
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChanges}
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChanges}
          ></input>
        </div>

        <div className="button">
          <button className="submitbtn">Log in</button>
        </div>
      </form>

      <span>
        Don't Have an Account? <Link to="/signup">Signup</Link>
      </span>
      <ToastContainer />
    </div>
  );
};

export default Login;
