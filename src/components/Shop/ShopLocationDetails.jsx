import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { DeActivateClicked } from "../../store/shopSlice";
import { RemoveScrollBar } from "react-remove-scroll-bar";

function ShopLocationDetails() {
  const dispatch = useDispatch();
  const { shopDetails } = useSelector((state) => state.shopReducer);
  const { name, address, phone, imgUrl } = shopDetails;

  return (
    <div className="fixed w-full h-screen bg-white top-0 left-0 z-50  ">
      <RemoveScrollBar />
      <div className="flex justify-end pt-8 px-4 sm:px-8">
        <GrClose
          className=" cursor-pointer"
          onClick={() => dispatch(DeActivateClicked())}
          size={25}
        />
      </div>

      <div className=" px-4 sm:px-0 sm:w-[80%] sm:mx-auto  ">
        <h1 className=" text-3xl font-semibold mb-5">{name}</h1>
        <p className=" opacity-90 mb-4  ">{address}</p>
        <p className="pb-6 md:pb-8 text-[#974103] font-semibold ">
          Call : {phone}
        </p>
        <h1 className="text-xl font-semibold mb-4">Opening Hours</h1>
        <p className="sm:w-2/5 opacity-90 mb-2 grid grid-cols-2 ">
          <span>Mon - Fri</span> 9 AM to 10 PM
        </p>
        <p className="sm:w-2/5 opacity-90 mb-8 md:mb-4 grid grid-cols-2 ">
          <span>Sat & Sun</span> 9 AM to 11 PM
        </p>
        <LazyLoadImage className=" w-full sm:max-w-sm " src={imgUrl} alt="" />
      </div>
    </div>
  );
}

export default ShopLocationDetails;
