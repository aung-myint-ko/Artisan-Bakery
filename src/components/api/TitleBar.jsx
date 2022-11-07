import React from "react";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";

function TitleBar(props) {
  return (
    <>
      <div className="p-3 sm:px-10 md:px-16 bg-white w-full flex justify-between items-center border-b border-gray-300 mb-3">
        <h1 className="text-lg font-medium">All Recipes</h1>
        <Link to={"/api/manage/create"}>
          <HiPlus className=" cursor-pointer" size={30} />
        </Link>
      </div>
    </>
  );
}

export default TitleBar;
