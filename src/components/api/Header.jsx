import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";

function Header(props) {
  const [click, setClick] = useState(false);
  const jsonUser = sessionStorage.getItem("admin");
  const currentUser = jsonUser ? JSON.parse(jsonUser) : { imageUrl: null };

  const handleLogout = async () => {
    await axiosInstance.post(`/user/logout`);
    sessionStorage.removeItem("admin");
    window.location.reload();
  };
  return (
    <>
      <div className=" bg-black py-3 px-3 sm:px-10 md:px-16 w-full flex justify-between items-center">
        <Link to={"/api/manage"}>
          <h1 className="font_title text-white font-extrabold text-xl tracking-widest ">
            ARTISAN
          </h1>
        </Link>

        <div
          onClick={() => setClick((prev) => !prev)}
          className=" cursor-pointer w-11 h-11 overflow-hidden border-white border-2 rounded-full flex justify-center items-center "
        >
          <img
            className="w-full h-full"
            src={
              currentUser.imageUrl && currentUser
                ? currentUser.imageUrl
                : "/images/user.png"
            }
            alt={currentUser.imageId}
          />
        </div>
        <div
          onClick={handleLogout}
          className={` ${
            click ? "flex" : "hidden"
          } cursor-pointer absolute top-[69px] right-[2px] w-fit px-4 py-3 bg-white shadow-lg border border-gray-300 rounded-md  gap-x-5 items-center `}
        >
          <h1 className=" text-lg">Log Out</h1>
          <FiLogOut size={20} />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Header;
