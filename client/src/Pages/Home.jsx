import React, { Fragment, useState } from "react";
import { IoIosSearch, IoMdMore } from "react-icons/io";
import CardMap from "../components/CardMap";
import Modal from "../components/Modal";
import NavBar from "../components/NavBar";
import { useIsAdminBarContext } from "../isAdminContext";
import { UserData } from "../lib/data";
import { MdDeleteOutline } from "react-icons/md";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [searchResults, setSearchResults] = useState(UserData);
  const [genderFilter, setGenderFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);

  const [data, setData] = useState({
    email: "",
    name: "",
    mobile: "",
    city: "",
    gender: "",
  });

 
  const { isAdmin, setisAdmin } = useIsAdminBarContext();
  console.log(isAdmin);
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const results = UserData.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.city.toLowerCase().includes(value)
    );
    setSearchResults(results);
  };

  const handleGenderFilter = (event) => {
    const value = event.target.value;
    setGenderFilter(value);
    const results =
      value === "all"
        ? UserData
        : UserData.filter((item) => item.gender.toLowerCase() === value);
    setSearchResults(results);
  };
  const handleCreateUser = () => {
    setShowModal1(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Assuming UserData is an array of objects, add the new data to the search results
    setSearchResults((prevSearchResults) => [...prevSearchResults, data]);

    // Optionally, you can reset the form data
    setData({
      email: "",
      name: "",
      mobile: "",
      address: "",
      gender: "",
    });
    setShowModal1(false);
  };

  const handleDelete = (data) => {
    // Filter out the user with the given id from searchResults
    setSearchResults((prevSearchResults) =>
      prevSearchResults.filter((user) => user.name !== data.name)
    );
  
  };

  return (
    <Fragment>
      <div className="w-screen h-screen p-4 bg-[#f4f5f6] ">
        <NavBar>
          <div className="p-2 w-full h-full ">
            <h1 className="lg:p-5 font-bold lg:text-3xl text-lg my-2">
              User List
            </h1>
            <div className="bg-white px-2 p-2 flex  lg:justify-end">
              <div className="flex gap-1 border rounded-md items-center px-2 mr-5 lg:w-fit w-full justify-between">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="    focus:outline-none"
                />
                <IoIosSearch />
              </div>
              <div className="  items-center gap-2 hidden lg:flex">
                <h1> Sort By Gender:</h1>
                <select
                  value={genderFilter}
                  onChange={handleGenderFilter}
                  className="border rounded-md mr-5"
                >
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {!isAdmin && (
                <div>
                  <button
                    className="bg-[#378bba] p-1 px-2 rounded-md text-white font-bold"
                    onClick={handleCreateUser}
                  >
                    Create
                  </button>
                </div>
              )}
            </div>

            <div className=" flex mt-5  p-2 rounded-md font-bold">
              <h1 className=" flex-1">Name</h1>

              <h1 className=" flex-1 hidden lg:block ">Gender</h1>
              <h1 className=" flex-1 hidden lg:block ">E-Mail</h1>
              <h1 className=" flex-1 hidden lg:block">Mobile NO</h1>
              <h1 className=" flex-1 mr-[15px] ">Adress</h1>
            </div>

            <div className="h-[350px] overflow-y-scroll scrollbar-hidden ">
              {searchResults.map((item, i) => (
                <div
                  key={i}
                  className={`flex p-2 rounded-md items-center mt-1  ${
                    i % 2 !== 0 ? "bg-[#f8f8f8]" : "bg-white"
                  }`}
                >
                  <div className="flex-1 flex gap-2 items-center">
                    <img
                      className="object-cover overflow-hidden w-8 h-8 rounded-full hidden lg:block"
                      src={item.img}
                      alt=""
                    />
                    <h1>{item.name}</h1>
                  </div>
                  <h1 className="flex-1 hidden lg:block">{item.gender}</h1>
                  <h1 className="flex-1 hidden lg:block">{item.email}</h1>
                  <h1 className="flex-1 hidden lg:block">{item.mobile}</h1>
                  <div className="flex-1 flex justify-between  ">
                    <h1>{item.city}</h1>

                    <button
                      className="hover:underline text-blue-500"
                      onClick={() => {
                        setShowModal(true);
                        setSelectedUser(item);
                      }}
                    >
                      View
                    </button>
                  </div>

                  {isAdmin && (
                    <div className="relative group">
                      <IoMdMore className="text-2xl cursor-pointer" />
                      <div className="absolute hidden group-hover:block right-0 top-5 p-2 bg-white border border-gray-200 rounded shadow">
                        <button
                          className="text-red-500 hover:text-red-700 z-10"
                          onClick={() => {
                            handleDelete(item);
                          }}
                        >
                          <div className="flex items-center">
                            <MdDeleteOutline />
                            <span className="ml-1">Delete</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </NavBar>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <CardMap data={selectedUser} />
      </Modal>
      <Modal isVisible={showModal1} onClose={() => setShowModal1(false)}>
        <div className="p-5 w-full  mt-5 ">
          <h1 className="text-2xl my-5">Create User</h1>
          <div className="flex gap-10">
            <div className="relative mt-5 w-fit ">
              <input
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
                value={data.name}
                placeholder=" "
                className="peer focus:outline-none placeholder-transparent  border-b-2 border-gray-300 w-full focus:border-[#F9B17A] "
              />
              <label
                htmlFor="name"
                className="absolute transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base"
              >
                Name
              </label>
            </div>

            <div className="relative mt-5 w-fit ">
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={data.email}
                placeholder=" "
                className="peer focus:outline-none placeholder-transparent  border-b-2 border-gray-300 w-full focus:border-[#F9B17A] "
              />
              <label
                htmlFor="email"
                className="absolute transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base"
              >
                Email
              </label>
            </div>
          </div>

          <div className="flex gap-10">
            <div className="relative mt-5 w-fit ">
              <input
                id="mobile"
                name="mobile"
                type="number"
                onChange={handleChange}
                value={data.mobile}
                placeholder=" "
                className="peer focus:outline-none placeholder-transparent  border-b-2 border-gray-300 w-full focus:border-[#F9B17A] "
              />
              <label
                htmlFor="mobile"
                className="absolute transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base"
              >
                Mobile
              </label>
            </div>
            <div className="relative mt-5 w-fit ">
              <input
                id="city"
                name="city"
                type="text"
                onChange={handleChange}
                value={data.city}
                placeholder=" "
                className="peer focus:outline-none placeholder-transparent  border-b-2 border-gray-300 w-full focus:border-[#F9B17A] "
              />
              <label
                htmlFor="city"
                className="absolute transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm left-0 -top-3.5 text-sm text-gray-600 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1 peer-placeholder-shown:text-base"
              >
                City
              </label>
            </div>
          </div>

          <div>
            <div className="relative mt-5">
              <label
                htmlFor="gender"
                className="text-lg text-gray-600 font-bold"
              >
                Gender
              </label>
              <div className="flex items-center mt-2">
                <input
                  id="male"
                  name="gender"
                  type="radio"
                  onChange={handleChange}
                  value="Male"
                  checked={data.gender === "Male"}
                  className="peer focus:ring-[#F9B17A] h-4 w-4 text-[#F9B17A] border-gray-300 rounded-sm"
                />
                <label htmlFor="male" className="ml-2">
                  Male
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  id="female"
                  name="gender"
                  type="radio"
                  onChange={handleChange}
                  value="Female"
                  checked={data.gender === "Female"}
                  className="peer focus:ring-[#F9B17A] h-4 w-4 text-[#F9B17A] border-gray-300 rounded-sm"
                />
                <label htmlFor="female" className="ml-2">
                  Female
                </label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  id="other"
                  name="gender"
                  type="radio"
                  onChange={handleChange}
                  value="Other"
                  checked={data.gender === "Other"}
                  className="peer focus:ring-[#F9B17A] h-4 w-4 text-[#F9B17A] border-gray-300 rounded-sm"
                />
                <label htmlFor="other" className="ml-2">
                  Other
                </label>
              </div>
            </div>
          </div>
          <button
            className="bg-[#378bba] p-1 px-2 rounded-md text-white font-bold mx-auto block"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </Fragment>
  );
}

export default Home;
