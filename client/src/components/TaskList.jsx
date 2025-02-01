import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Initialize as an empty array
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios.get(`${API_BASE_URL}/api/tasks`, config);

      // Ensure the response data is an array
      if (Array.isArray(res.data)) {
        setTasks(res.data);
      } else {
        console.error("Expected an array but got:", res.data);
        setTasks([]); // Fallback to an empty array
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      navigate("/login"); // Redirect to login if unauthorized
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-list flex flex-col items-center">
      <div class="flex justify-between items-center w-[95%]">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text text-center">
          Your Tasks
        </h1>
        <button
          onClick={() => navigate("/add-task")}
          className="bg-[#28a745] px-[15px] py-[10px] my-5 border-none rounded-[5px] text-white cursor-pointer hover:bg-[#218838]"
        >
          Add New Task
        </button>
      </div>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task key={task._id} task={task} fetchTasks={fetchTasks} />
        ))
      ) : (
        <p>No tasks found. Add a new task!</p>
      )}
    </div>
  );
};

export default TaskList;
