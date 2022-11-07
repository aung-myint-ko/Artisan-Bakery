import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BsArrowLeftShort } from "react-icons/bs";
import { FormField } from "./FormField";
import OrderSuccess from "./OrderSuccess";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Please enter name").min(4),
    email: yup.string().email().required("Please enter email"),
    phone: yup.string().required("Please enter phone"),
    building: yup.string().required("Please enter building number"),
    region: yup.string().required("Please enter region"),
    state: yup.string().required("Please enter state"),
    township: yup.string().required("Please enter township"),
    kpay: yup.string().required("Please enter Kpay No."),
  })
  .required();

function Registration(props) {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  let { orderLists, finalTotalPrice, totalQuantity } = useSelector(
    (state) => state.cartReducer
  );
  orderLists.map((order) => (finalTotalPrice += order.totalPrice));

  const [customer, setCustomer] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const OnSubmit = async (data) => {
    setCustomer(data);
    await axios.put("/auth/customer/history", {
      date: currentDate,
      hour: formatAMPM(new Date()),
      quantity: totalQuantity,
      amount: finalTotalPrice + 1200,
      foods: orderLists,
    });
  };

  return (
    <div className=" px-4 md:px-14 lg:px-20 pb-10 lg:pb-20">
      {customer ? (
        <OrderSuccess />
      ) : (
        <>
          <Link to={"/cart"}>
            <p className=" py-4 flex items-center gap-x-3 lg:mb-5 ">
              <BsArrowLeftShort className="text-3xl" /> Back to Cart
            </p>
          </Link>
          <form onSubmit={handleSubmit(OnSubmit)} className="pb-8">
            <div className="flex flex-col-reverse lg:flex-row  gap-y-10 gap-x-5 pb-8 ">
              <div className=" lg:w-[70%]">
                <h1 className="text-3xl mb-5">Delivery Information</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  {FormField.map((form) => {
                    return (
                      <span key={form.name}>
                        <label className=" capitalize font-medium" htmlFor="">
                          {form.label}
                        </label>
                        <input
                          {...register(form.name)}
                          className=" outline-none border-b w-full text-black/80 text-sm py-1"
                          type={form.type}
                          placeholder={`Enter your ${form.label}`}
                        />
                        <p className=" mt-1 text-[0.61rem] text-red-500 font-bold tracking-wider">
                          {errors[form.name]?.message}
                        </p>
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className=" mx-auto w-[90%] md:w-[50%] lg:w-[30%] h-fit bg-slate-100 py-8 px-5">
                <h1 className="text-center lg:text-start text-3xl mb-5">
                  Order Summary
                </h1>
                <div className="flex flex-col gap-y-4 pb-5 border-b border-slate-300">
                  <span className=" flex items-center">
                    <h1 className=" w-[55%]">Total Items</h1>
                    <p className=" w-[10%] text-center">-</p>
                    <p className="w-[35%] text-end">{totalQuantity}</p>
                  </span>
                  <span className=" flex items-center">
                    <h1 className=" w-[55%]">Taxes</h1>
                    <p className=" w-[10%] text-center">-</p>
                    <p className="w-[35%] text-end">500 Ks</p>
                  </span>
                  <span className=" flex items-center">
                    <h1 className=" w-[55%]">Delivery Charges</h1>
                    <p className=" w-[10%] text-center">-</p>
                    <p className="w-[35%] text-end">700 Ks</p>
                  </span>
                </div>
                <div className=" flex justify-between pt-5 tracking-wider">
                  <h1 className=" text-2xl  font-semibold">Total</h1>
                  <h1 className="text-xl">{finalTotalPrice + 1200} Ks</h1>
                </div>
              </div>
            </div>
            <button type={"submit"} className="button mx-auto">
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Registration;
