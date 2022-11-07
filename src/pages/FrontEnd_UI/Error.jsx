import React from "react";
import { Link } from "react-router-dom";

function Error(props) {
  return (
    <div className="w-full h-screen flex flex-col gap-y-7 justify-center items-center bg-[#fff4ec]">
      <h1 className=" text-2xl sm:text-4xl tracking-wider">
        404 | Page Not Found...
      </h1>
      <Link to={"/"}>
        <button className=" py-[10px] px-7 mx-auto bg-[#974103]  rounded-full text-white border border-white text-lg hover:bg-[#b15412]">
          Go to Home
        </button>
      </Link>
    </div>
  );
}

export default Error;
