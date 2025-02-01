import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Save } from "../assets/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Get the current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/auth/user/update/${currentUser._id}`,
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"), // Add this header
          },
        }
      );
      toast.success("Name updated successfully! 🎉");
      setName("");
      // Update the user in localStorage
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, name: res.data.user.name })
      );
    } catch (error) {
      toast.error("Failed to update name! ❌");
      console.error(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/auth/user/reset-password/${currentUser._id}`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"), // Add this header
          },
        }
      );
      toast.success("Password reset successfully! 🔑");
      setPassword("");
    } catch (error) {
      toast.error("Failed to reset password! ❌");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/auth/logout`);
      // Clear the user from localStorage
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token"); // Clear the token
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="task-list flex flex-col items-center w-[90%]">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text text-center my-3">
        Profile
      </h1>
      <div className="w-full">
        <div className="flex flex-row">
          <input
            type="text"
            className="px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder={currentUser.username}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="px-[15px] cursor-pointer w-[20%]"
            onClick={handleUpdateName}
          >
            <img src={Save} alt="Save" />
          </button>
        </div>
        <div className="flex flex-row">
          <input
            type="password"
            className="px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="px-[15px] cursor-pointer w-[20%]"
            onClick={handleResetPassword}
          >
            <img src={Save} alt="Save" />
          </button>
        </div>
        <button
          type="submit"
          onClick={handleLogout}
          className="bg-[#28a745] px-[15px] py-[10px] my-5 border-none rounded-[5px] text-white cursor-pointer w-full hover:bg-[#218838] float-right"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
