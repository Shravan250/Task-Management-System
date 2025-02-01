import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { toast } from "react-toastify";
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
      toast.success("Registration successful! 🎉");
      alert("Registration successful! Please login.");
      navigate("/login"); // Use navigate instead of history.push
    } catch (err) {
      toast.error(error.response?.data?.msg || "Registration failed! ❌");
    }
  };

  return (
    <div className="task-list flex flex-col items-center w-[90%]">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text text-center my-3">
        Register
      </h1>
      <form onSubmit={onSubmit} className="w-full">
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-[#28a745] px-[15px] py-[10px] my-5 border-none rounded-[5px] text-white cursor-pointer w-full hover:bg-[#218838] float-right"
        >
          Register
        </button>
      </form>
      <p className="text-gray-600 text-sm">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-blue-500 font-semibold hover:underline"
        >
          Login here
        </a>
        .
      </p>
    </div>
  );
};

export default Register;
