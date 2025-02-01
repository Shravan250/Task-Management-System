import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddTask = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTask = { description, date };
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      await axios.post(`${API_BASE_URL}/api/tasks`, newTask, config);
      alert("Task Added");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.error("Server responded with an error:", err.response.data);
        alert("Failed to add task: " + err.response.data.message);
      } else if (err.request) {
        console.error("No response received from the server:", err.request);
        alert("Failed to connect to the server. Please try again later.");
      } else {
        console.error("Error:", err.message);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
