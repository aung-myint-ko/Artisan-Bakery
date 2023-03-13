import React, { useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

function Header(props) {
  const { totalQuantity, currentUser } = useSelector(
    (state) => state.cartReducer
  );
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const OuterRef = useRef();
  const MenuRef = useRef();
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(false);
    const CloseNav = (e) => {
      const element = e.target;
      if (
        !MenuRef.current.contains(element) &&
        OuterRef.current.contains(element)
      ) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", CloseNav);
    return () => document.body.removeEventListener("click", CloseNav);
  }, [pathname]);

  return (
    <div className=" px-4 md:px-14 lg:px-20 py-3 z-40 border-b bg-white border-gray-300 sticky top-0 left-0 w-full flex items-center justify-between ">
      <div className=" z-50 md:hidden">
        <Hamburger
          onToggle={handleToggle}
          toggled={open}
          rounded
          color="#535252"
        />
      </div>

      <Link to={"/"}>
        <h1 className="font_title font-bold text-3xl z-50 tracking-wider ">
          Artisan
        </h1>
      </Link>
      {/* navlink for Phone*/}
      <div
        ref={OuterRef}
        className={` md:hidden absolute top-[73px] left-0 w-full duration-300 transition-all ${
          open ? "bg-black/20 h-screen" : "bg-black/0"
        }`}
      >
        <div
          ref={MenuRef}
          className={`z-30 text-xl absolute top-0 left-0 w-[70%] bg-white h-screen duration-300 transition-all ease-linear ${
            open ? "left-0" : "-left-[100%]"
          } `}
        >
          <ul className="flex flex-col gap-y-8 tracking-wider border-b border-gray-400 mx-6 pt-16 pb-6 ">
            <NavLink
              to={"/menu/all"}
              className={({ isActive }) =>
                isActive ? "clicked_nav_active" : "nav_active"
              }
            >
              <li>Menu</li>
            </NavLink>
            <NavLink
              to={"/shop"}
              className={({ isActive }) =>
                isActive ? "clicked_nav_active" : "nav_active "
              }
            >
              <li>Shop</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? "clicked_nav_active" : "nav_active "
              }
            >
              <li>About</li>
            </NavLink>
          </ul>

          {currentUser ? (
            <Link to={"/user/profile"}>
              <div className=" inline-block cursor-pointer py-2 px-5 mx-6 mt-5 border-[#6b320a] border-2 bg-white hover:bg-slate-50 hover:shadow-lg rounded-full ">
                <h1 className=" font-medium">
                  {currentUser && currentUser.name}
                </h1>
              </div>
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="mx-5 mt-6 px-6 py-2 border border-[#974103] rounded-full hover:font-normal hover:bg-[#974103] hover:text-white ">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
      {/* navlink for desktop and tablet */}
      <ul className=" hidden md:flex list-none gap-x-7 font-semibold tracking-wide ">
        <NavLink
          to={`/menu/all`}
          className={({ isActive }) =>
            isActive ? "clicked_nav_active" : "nav_active "
          }
        >
          <li>Menu</li>
        </NavLink>
        <NavLink
          to={"/shop"}
          className={({ isActive }) =>
            isActive ? "clicked_nav_active" : "nav_active "
          }
        >
          <li>Shop</li>
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) =>
            isActive ? "clicked_nav_active" : "nav_active "
          }
        >
          <li>About</li>
        </NavLink>
      </ul>
      <div className=" flex items-center gap-x-5 font-semibold ">
        {currentUser ? (
          <Link to={"/user/profile"}>
            <div className=" hidden md:flex justify-center items-center cursor-pointer py-1 px-4 border-[#6b320a] border-2 bg-white hover:bg-slate-50 hover:shadow-lg rounded-full  ">
              <h1 className=" font-medium text-sm ">
                {currentUser && currentUser.name}
              </h1>
            </div>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button className=" hidden md:block px-4 py-1 border border-[#974103] rounded-full hover:font-normal hover:bg-[#974103] hover:text-white ">
              Log In
            </button>
          </Link>
        )}

        <Link className=" relative" to={"/cart"}>
          <BsBag size={28} />
          <p className=" absolute top-[17.5px] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#974103] text-sm">
            {totalQuantity}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Header;
