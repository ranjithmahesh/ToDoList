import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import axios from "axios";
import { BASEURL } from "../lib/data";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

function DashBord() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [updateButton, setUpdateButton] = useState(false);
  const [updateingTask, setUpdateingTask] = useState(null);
  const [task, setTask] = useState({
    title: "",
    des: "",
  });

  // Fetch tasks initially and whenever showModal changes
  useEffect(() => {
    fetchAPI();
  }, [showModal]);

  const handleSubmit = async () => {
    if (!task.title || !task.des) {
      return alert("Enter all data");
    }

    try {
      await axios.post(BASEURL + "task/create", {
        title: task.title,
        des: task.des,
      });
      setTask({ title: "", des: "" });
      fetchAPI();
      setShowModal(false);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    }
  };

  const fetchAPI = () => {
    axios.get(BASEURL + "task/all").then((res) => {
      setData(res.data.task);
    });
  };

  const deleteTask = async (user) => {
    try {
      await axios.delete(BASEURL + `task/delete/${user._id}`);
      fetchAPI();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const updateTask = async (user) => {
    setUpdateButton(true);
    setTask(user);
    setUpdateingTask(user);
    setShowModal(true);
  };

  const handleUpdate = () => {
    try {
      axios
        .put(BASEURL + `task/update/${updateingTask._id}`, {
          title: task.title,
          des: task.des,
        })
        .then((res) => {
          console.log(res.data);
          fetchAPI();
        });
      setUpdateButton(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task.");
    }
  };
  const handleCreateUser = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevData) => ({ ...prevData, [name]: value }));
  };
  const colors = ["#FF5733", "#4FFFB0", "#33D4FF", "#581845", "#FFC300"];

  return (
    <div className="bg-[#f4f5f6] p-4">
      <NavBar>
        <div className="flex justify-between items-center mt-10 ">
          <h1 className="text-3xl  font-bold ">Task List</h1>
          <button
            className="bg-[#378bba] p-1 px-2 rounded-md text-white font-bold hover:opacity-65 hover:scale-110"
            onClick={handleCreateUser}
          >
            Create Task
          </button>
        </div>

        <div className="flex  flex-row flex-wrap  gap-4">
          {data &&
            data.map((item, i) => (
              <div
                className={`flex flex-col h-[150px] w-[300px] max-h-[500px] rounded-xl  mt-5  overflow-hidden`}
                style={{ backgroundColor: colors[i % colors.length] }}
                key={i}
              >
                <div className="p-5 text-white flex flex-col justify-between h-full ">
                  <Link to={`/details/${item._id}`}>
                    <div className="flex flex-col justify-between">
                      <h1 className="text-lg   font-semibold line-clamp-2  ">
                        {item.title}
                      </h1>
                      <h1 className="text-base line-clamp-1  ">{item.des}</h1>
                    </div>
                  </Link>
                  <div className="  flex   justify-between  ">
                    <button
                      onClick={() => {
                        updateTask(item);
                      }}
                      className="   border p-1 rounded-md hover:scale-110 hover:opacity-60 "
                    >
                      Update
                    </button>
                    <button
                      className="   border p-1 rounded-md hover:scale-110 hover:opacity-60 "
                      aria-label="Delete task"
                      onClick={() => {
                        deleteTask(item);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </NavBar>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-5 w-[300px] ">
          <h1 className="text-2xl font-semibold">Create Task</h1>
          <div className="flex gap-10">
            <div className="relative mt-5 w-fit ">
              <input
                id="title"
                name="title"
                type="text"
                onChange={handleChange}
                value={task.title}
                placeholder=" "
                className="peer focus:outline-none placeholder-transparent  border-b-2 border-gray-300 w-full focus:border-[#F9B17A] "
              />
              <label
                htmlFor="name"
                className="absolute transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base"
              >
                Tittle
              </label>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="relative mt-5 w-fit ">
              <input
                id="des"
                name="des"
                type="text"
                onChange={handleChange}
                value={task.des}
                placeholder=" "
                className="peer focus:outline-none placeholder-transparent  border-b-2 border-gray-300 w-full focus:border-[#F9B17A] "
              />
              <label
                htmlFor="des"
                className="absolute transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base"
              >
                Description
              </label>
            </div>
          </div>
          {!updateButton ? (
            <button
              className="bg-[#378bba] p-1 px-2 rounded-md text-white font-bold mx-auto block mt-5"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              className="bg-[#378bba] p-1 px-2 rounded-md text-white font-bold mx-auto block mt-5"
              onClick={handleUpdate}
            >
              Update
            </button>
          )}
        </div>{" "}
      </Modal>
    </div>
  );
}

export default DashBord;
