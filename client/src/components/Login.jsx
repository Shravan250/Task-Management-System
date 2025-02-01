import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Login and get the token
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      // Step 2: Store the token in localStorage
      localStorage.setItem("token", res.data.token);

      // Step 3: Fetch the user details using the token
      const userRes = await axios.get(`${API_BASE_URL}/api/auth/me`, {
        headers: {
          "x-auth-token": res.data.token, // Send the token in the header
        },
      });

      // Step 4: Store the user details in localStorage
      localStorage.setItem("currentUser", JSON.stringify(userRes.data));

      // Step 5: Redirect to the home page
      navigate("/");
      toast.success("Login successful! 🚀");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(error.response?.data?.msg || "Invalid credentials! ❌");
    }
  };

  return (
    <div className="task-list flex flex-col items-center w-[90%]">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text text-center my-3">
        Login
      </h1>
      <form onSubmit={onSubmit} className="w-full">
        <input
          type="text"
          className="px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-[#28a745] px-[15px] py-[10px] my-5 border-none rounded-[5px] text-white cursor-pointer w-full hover:bg-[#218838] float-right"
        >
          Login
        </button>
      </form>
      <p className="text-gray-600 text-sm">
        Don't have an account?{" "}
        <a
          href="/register"
          className="text-blue-500 font-semibold hover:underline"
        >
          Register here
        </a>
        .
      </p>
    </div>
  );
};

export default Login;
