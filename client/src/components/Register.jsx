import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, {
        username,
        password,
      });

      alert("Registration successful! Please login.");
      navigate("/login"); // Use navigate instead of history.push
    } catch (err) {
      console.error(err.response.data);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default Register;
