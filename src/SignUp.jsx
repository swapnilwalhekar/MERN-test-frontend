import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const collectData = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:9000/register", {
        name: name,
        email: email,
        password: password,
      });

      if (result.data) {
        localStorage.setItem("user", JSON.stringify(result.data.result));
        localStorage.setItem("token", JSON.stringify(result.data.auth));
      }

      navigate("/");
      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="main-register">
      <div className="register">
        <img src="../src/assets/main.png" alt="" />
        <p className="log-head">Welcome to Digitalflake admin</p>
        <form onSubmit={collectData}>
          <input
            className="inputBox"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="inputBox"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="inputBox"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="appButton" type="submit">
            Sign Up
          </button>
        </form>
        {message && <p>{message}</p>}
        <div>
          <Link to={"/signin"}>Already have account? Log In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
