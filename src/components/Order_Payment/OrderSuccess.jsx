import React from "react";
import axiosInstance from "../../axiosInstance";
import { useDispatch } from "react-redux";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { Link } from "react-router-dom";
import { AddingCurrentUserInfo, CleaningCart } from "../../store/cartSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

function OrderSuccess(props) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(CleaningCart());
    const request = await axiosInstance.get(`user/info`);
    dispatch(AddingCurrentUserInfo(request.data));
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-white flex items-center justify-center z-50 ">
      <RemoveScrollBar />
      <div className=" w-[90%] md:w-[50%] lg:w-[40%] bg-white py-7 px-5 rounded-md shadow-lg border-[3px] text-center">
        <img
          className=" w-[173px] h-[176px] mx-auto mb-2"
          src="/images/success.gif"
          alt="success"
        />
        <h1 className="text-3xl font-semibold mb-4">Order Successful</h1>
        <p className=" w-[80%] mx-auto mb-5">
          Your order wil be served within 2 hours. Thank You for your order.
        </p>
        <Link to={"/"}>
          <button onClick={handleClick} className="button mx-auto">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
