import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Task = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task.description || ""); // Ensure default value
  const [date, setDate] = useState(
    task.date ? new Date(task.date).toISOString().split("T")[0] : "" // Ensure default value
  );
  const [completed, setCompleted] = useState(task.completed || false);

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
            <div className="flex flex-col justify-between items-start">
              <div className="text-md mb-1 lg:mb-2">{task.title}</div>
              <div className="text-sm text-gray-400 mb-1 lg:mb-2">
                {task.description}
              </div>
              <div className="flex items-center gap-1 flex-row">
                <img className="w-4 h-4" src={Clock} alt="clock-icon" />
                <span className="text-sm text-[#ab94ff]">{task.time}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <div className="flex flex-row float-end gap-1 items-center">
                <img
                  className="h-6 w-6 bg-[#d6f3ff] p-[5px] rounded-[4px]"
                  src={Edit}
                  alt="edit-icon"
                />
                <img
                  className="h-6 w-6 bg-[#ffc3c3] p-[4px] rounded-[4px]"
                  src={Delete}
                  alt="delete-icon"
                />
              </div>
              <div
                className={`px-[10px] rounded-full ${handleStatusStyle(
                  task.status
                )}`}
              >
                {task.status}
              </div>
            </div>
          </div>
  
  
  */

  return (
    <div className="task">
      {isEditing ? (
        <>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={completed}
            onChange={toggleCompletion}
          />
          <p style={{ textDecoration: completed ? "line-through" : "none" }}>
            {task.description}
          </p>
          <p>Date: {new Date(task.date).toLocaleDateString()}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Task;
