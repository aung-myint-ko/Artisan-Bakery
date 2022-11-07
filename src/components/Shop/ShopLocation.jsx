import React from "react";
import { MdLocationPin } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ActivateClicked, GiveShopDetails } from "../../store/shopSlice";

function ShopLocation({ shopDetails }) {
  const dispatch = useDispatch();
  const { name, address } = shopDetails;
  const handleClick = () => {
    dispatch(ActivateClicked());
    dispatch(GiveShopDetails(shopDetails));
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="p-2 lg:py-3 grid grid-cols-8 sm:grid-cols-7 gap-x-4 items-center bg-slate-100 hover:shadow rounded cursor-pointer "
      >
        <span className="mx-auto">
          <MdLocationPin size={30} />
        </span>
        <div className=" col-span-6 sm:col-span-5">
          <h1 className="font-semibold mb-1">{name}</h1>
          <p className=" opacity-90 text-xs">{address} </p>
        </div>
        <span className="mx-auto">
          <AiOutlineInfoCircle size={23} />
        </span>
      </div>
    </>
  );
}

export default ShopLocation;
