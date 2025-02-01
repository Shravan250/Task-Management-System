import React, { useState } from "react";
import axios from "axios";
import { Edit, Delete, Clock } from "../assets/index";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Task = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description || ""); // Ensure default value
  const [date, setDate] = useState(
    task.date ? new Date(task.date).toISOString().split("T")[0] : "" // Ensure default value
  );
  const [status, setStatus] = useState("In progress");
  const [completed, setCompleted] = useState(task.completed || false);

  const handleStatusStyle = (status) => {
    switch (status) {
      case "In progress":
        return "bg-[#FFE9E1] text-[#FF7E53]";
      case "Completed":
        return "bg-[#EDE8FF] text-[#683EE3]";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const containerStyles =
    "flex flex-row mx-auto my-3 justify-between min-h-[100px] w-[95%] p-3 border-[0.5px] border-slate-300 rounded-md shadow-lg bg-white ";

  const handleEdit = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      await axios.put(
        `${API_BASE_URL}/api/tasks/${task._id}`,
        { description, date },
        config
      );
      setIsEditing(false);
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      await axios.delete(`${API_BASE_URL}/api/tasks/${task._id}`, config);
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleClick = () => {
    setStatus((prevStatus) =>
      prevStatus === "In progress" ? "Completed" : "In progress"
    );
    toggleCompletion();
  };

  const toggleCompletion = async () => {
    try {
      const config = {
        headers: {
          "x-auth-token": localStorage.getItem("token"), // Ensure this is included
        },
      };
      const res = await axios.put(
        `${API_BASE_URL}/api/tasks/${task._id}/toggle`,
        {},
        config
      );
      setCompleted(res.data.completed); // Update the local state
      fetchTasks(); // Refresh the task list
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  /*
  
            <div key={index} className={containerStyles}>

              <div className="text-md mb-1 lg:mb-2">{task.title}</div>
              <div className="text-sm text-gray-400 mb-1 lg:mb-2">
                {task.description}
              </div>

            </div>

          </div>
  
  
  */

  return (
    <div className={containerStyles}>
      {isEditing ? (
        <>
          <div className="flex flex-col w-full">
            <div>
              <input
                type="text"
                value={description}
                className="px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="date"
                value={date}
                className="px-4 py-2 border rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-around">
              <button
                onClick={handleEdit}
                className="bg-[#28a745] px-[15px] py-[10px] my-5 border-none rounded-[5px] text-white min-w-[20%] cursor-pointer hover:bg-[#218838] "
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-[#28a745] px-[15px] py-[10px] my-5 border-none rounded-[5px] text-white min-w-[20%] cursor-pointer hover:bg-[#218838] "
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-between items-start">
            <div className="text-md mb-1 lg:mb-2">
              <p
                style={{ textDecoration: completed ? "line-through" : "none" }}
              >
                {task.description}
              </p>
            </div>

            <div className="flex items-center gap-1 flex-row">
              <img className="w-4 h-4" src={Clock} alt="clock-icon" />
              <span className="text-sm text-[#ab94ff]">
                {" "}
                <p>Date: {new Date(task.date).toLocaleDateString()}</p>
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end w-[160px]">
            <div className="flex flex-row float-end gap-1 items-center">
              <button onClick={() => setIsEditing(true)}>
                {" "}
                <img
                  className="h-6 w-6 bg-[#d6f3ff] p-[5px] rounded-[4px]"
                  src={Edit}
                  alt="edit-icon"
                />
              </button>
              <button onClick={handleDelete}>
                {" "}
                <img
                  className="h-6 w-6 bg-[#ffc3c3] p-[4px] rounded-[4px]"
                  src={Delete}
                  alt="delete-icon"
                />
              </button>
            </div>
            <div
              className={`px-[10px] rounded-full ${handleStatusStyle(status)}`}
              style={{ width: "max-content" }}
              onClick={handleClick}
            >
              {status}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
