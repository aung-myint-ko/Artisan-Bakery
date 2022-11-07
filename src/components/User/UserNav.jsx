import React from "react";
import { NavLink } from "react-router-dom";

function UserNav(props) {
  return (
    <ul className="px-4 md:px-14 lg:px-20 pt-2 pb-3 flex gap-x-8 list-none border-b border-slate-300 bg-slate-50 tracking-wider ">
      <NavLink
        to={`/user/profile`}
        className={({ isActive }) =>
          isActive ? "user_active" : "user_deactive"
        }
      >
        <li>Profile</li>
      </NavLink>
      <NavLink
        to={`/user/history`}
        className={({ isActive }) =>
          isActive ? "user_active" : "user_deactive"
        }
      >
        <li>History</li>
      </NavLink>
    </ul>
  );
}

export default UserNav;
