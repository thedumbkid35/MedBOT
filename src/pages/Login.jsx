import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("");
    setEmail("");
  }, []);

  const handleLogin = () => {
    if (name && email) {
      const profile = { name, email };
      localStorage.setItem("profile", JSON.stringify(profile));
      navigate("/home");
    } else {
      alert("Please fill in both name and email.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="logo-title">MedBOT</div>

      <div className="login-container">
        <h2>Login to MedBOT</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleLogin}>Continue</button>
      </div>
    </div>
  );
};

export default Login;
