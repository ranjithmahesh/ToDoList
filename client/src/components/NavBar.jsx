import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoMdClose,
} from "react-icons/io";

import React, { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIsAdminBarContext } from "../isAdminContext";
import { MobileNavMenu, NavMenu } from "../lib/data";
import logo from "../lib/logo.svg";
import { useNavBarContext } from "../reduser";

function NavBar({ children }) {
  const { isNavBarShown, setIsNavBarShown } = useNavBarContext();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileNavBar, setMobileNavBar] = useState(null);
  const { isAdmin, setisAdmin } = useIsAdminBarContext();

  const location = useLocation();
  const pathName = location.pathname;
  const router = useNavigate();
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       router("/", { replace: true });
  //       console.error("No token found in localStorage");
  //       return;
  //     }

  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/auth/user`,
  //         { params: { email: token } }
  //       );
  //       const data = response.data;
  //       console.log(data.user.isAdmin);
  //       setisAdmin(data.user.isAdmin);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const handleLogout = () => {
    localStorage.clear();
    router("/");
  };
  return (
    <div className=" ">
      <div className="h-[50px] bg-white rounded-t-md flex items-center px-2 justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-12" />
          <h1 className=" text-[#378bba] font-extrabold text-xl">AHLFAGON</h1>
        </div>
        <div className="flex gap-5 text-xl items-center ">
          <GoBell />
          <div className="relative group">
            <IoSettingsOutline className=" cursor-pointer" />
            <div className="absolute hidden group-hover:block -right-8 top-5 p-2 bg-white border border-gray-200 rounded shadow">
              <button
                className="text-[#378bba] hover:text-[#61c0f3] z-10"
                // onClick={() => {
                //   handleDelete(item);
                // }}
              >
                <div
                  className="flex items-center text-sm"
                  onClick={() => router("/profile")}
                >
                  <CgProfile />
                  <span className="ml-1">Profile</span>
                </div>
              </button>
              <button
                className="text-[#378bba] hover:text-[#61c0f3] z-10"
                onClick={handleLogout}
              >
                <div className="flex items-center text-sm">
                  <FiLogOut />
                  <span className="ml-1">Logout</span>
                </div>
              </button>
            </div>
          </div>
          <div className="rounded-full ">
            <img
              alt="kjh"
              className="object-cover overflow-hidden w-8 h-8 rounded-full "
              src={
                "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
              }
            />
          </div>
          <div className="lg:hidden block">
            {mobileNavBar ? (
              <IoMdClose onClick={() => setMobileNavBar((prev) => !prev)} />
            ) : (
              <GiHamburgerMenu
                onClick={() => setMobileNavBar((prev) => !prev)}
              />
            )}
          </div>
        </div>
      </div>
      <div className=" flex gap-6 ">
        {mobileNavBar ? (
          <div className="px-3  lg:px-0 bg-transparent bg-white bg-opacity-35 z-10">
            <div className="flex flex-col justify-between  mx-auto">
              <div>
                {MobileNavMenu.map((item, i) => (
                  <Link
                    to={item.Link}
                    className={`ml-2 items-center text-lg font-semibold text-[#378bba] mt-2 my-6 cursor-pointer  flex -mr-[100px]   
                    
                     ${pathName === item.Link && "text-[#0a77b2] "}
                    
                     `}
                    key={i}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item.icon}{" "}
                    <p className="text-sm ">
                      {hoveredItem === item.name && item.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {isNavBarShown ? (
              <div className=" bg-white w-1/6 mt-1 p-2  rounded-b-lg h-[500px]  hidden lg:block ">
                <div className=" flex justify-between items-center  ">
                  <h1 className="text-sm text-slate-500">Menu</h1>
                  <div className="cursor-pointer">
                    {isNavBarShown ? (
                      <IoIosArrowDropleftCircle
                        className="-mr-[20px] text-2xl text-[#378bba]  "
                        onClick={() => setIsNavBarShown((prev) => !prev)}
                      />
                    ) : (
                      <IoIosArrowDroprightCircle
                        className="-mr-[20px] text-2xl text-[#378bba]  "
                        onClick={() => setIsNavBarShown((prev) => !prev)}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col justify-between ">
                  <div>
                    {NavMenu.map((item, i) => (
                      <Link
                        to={item.Link}
                        className={`flex gap-5 items-center text-lg font-semibold text-[#378bba] mt-2 my-6 cursor-pointer ${
                          pathName === item.Link &&
                          "border-r-4 border-[#378bba]"
                        } `}
                        key={i}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" bg-white w-[60px] mt-1 p-2 rounded-l-sm h-[500px] ">
                <div className=" ml-[40px] cursor-pointer ">
                  {isNavBarShown ? (
                    <IoIosArrowDropleftCircle
                      className="-mr-[10px] text-2xl text-[#378bba]   "
                      onClick={() => setIsNavBarShown((prev) => !prev)}
                    />
                  ) : (
                    <IoIosArrowDroprightCircle
                      className="-mr-[20px] text-2xl text-[#378bba]  "
                      onClick={() => setIsNavBarShown((prev) => !prev)}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-between  mx-auto">
                  <div>
                    {NavMenu.map((item, i) => (
                      <Link
                        to={item.Link}
                        className={`ml-2 items-center text-lg font-semibold text-[#378bba] mt-2 my-6 cursor-pointer  flex -mr-[100px]   
                    
                     ${pathName === item.Link && "text-[#0a77b2] "}
                    
                     `}
                        key={i}
                        onMouseEnter={() => setHoveredItem(item.name)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        {item.icon}{" "}
                        <p className="text-sm ">
                          {hoveredItem === item.name && item.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <div className="w-full h-full  ">{children}</div>
      </div>
    </div>
  );
}

export default NavBar;
