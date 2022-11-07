import React from "react";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Link } from "react-router-dom";
import { CloseMessage } from "../../store/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CheckingUser(props) {
  const dispatch = useDispatch();
  return (
    <div className=" w-full h-screen bg-black/90 fixed top-0 left-0 z-50 flex justify-center items-center">
      <div className=" w-[90%] md:w-[60%] lg:w-[55%] py-8 md:py-11 lg:py-14 px-5 bg-white rounded-sm   ">
        <RemoveScrollBar />
        <div className="flex justify-end px-4">
          <GrClose
            onClick={() => dispatch(CloseMessage())}
            className=" cursor-pointer"
            size={25}
          />
        </div>
        <div className="mb-5 md:mb-8 w-fit mx-auto p-4 bg-slate-200 rounded-full ">
          <LazyLoadImage className="w-20 h-20 " src="/images/icon.png" alt="" />
        </div>
        <h1 className=" text-lg md:text-2xl text-center md:w-[75%] mx-auto mb-8">
          To place and order. You need to be Artisan member.
        </h1>
        <div className=" w-[90%] md:w-[60%] gap-5 md:gap-6 lg:gap-8 grid grid-cols-2 mx-auto ">
          <Link to={"/login"}>
            <button className="button ml-auto">Log In</button>
          </Link>
          <Link to={"/signup"}>
            <button className="button mr-auto">Sing Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckingUser;
