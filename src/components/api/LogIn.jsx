import axios from "axios";
import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginError, LoginStart, LoginSuccess } from "../../store/apiSlice";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ClipLoader from "react-spinners/ClipLoader";
import * as yup from "yup";

axios.defaults.withCredentials = true;
//Forms validation schema for admin log in
const schema = yup
  .object()
  .shape({
    email: yup.string().email().required("Please enter email"),
    password: yup.string().required("Please enter password").min(4),
  })
  .required();

function LogIn(props) {
  const { currentUser, loading, error } = useSelector(
    (state) => state.apiReducer
  );
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordStatus, setPasswordStatus] = useState("show");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      dispatch(LoginStart());
      const postUser = await axiosInstance.post(`/admin/signin`, formData);
      sessionStorage.setItem("admin", JSON.stringify(postUser.data));
      if (postUser.status === 200) {
        toast.success("Successfully Login", { duration: 700 });
        dispatch(LoginSuccess(postUser.data));
        setTimeout(() => {
          naviagate(`/api/manage`);
        }, 1000);
      }
    } catch (err) {
      dispatch(LoginError(err.response.data.message));
    }
  };

  //Show & Hide function for Password input
  const ShowHidePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setPasswordStatus("hide");
      return;
    }
    setPasswordType("password");
    setPasswordStatus("show");
  };
  return (
    <>
      <Toaster />
      <div className=" w-full h-screen bg-gray-100  flex justify-center items-center ">
        <div className=" w-11/12 max-w-sm py-10 px-8 border border-gray-200 shadow-md rounded-md bg-white ">
          <h1 className=" choco font_title font-extrabold text-center text-2xl tracking-widest mb-3 ">
            ARTISAN
          </h1>

          {error ? (
            <p className=" py-2 px-1 mb-8 text-xs tracking-wide bg-red-500 text-white text-center ">
              {error}
            </p>
          ) : (
            <p className=" mb-8 text-sm text-center italic font-light">
              Note: Only admins are allow to log in.
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} action="">
            <div className="mb-7">
              <div className=" flex flex-col mb-5">
                <label className=" text-lg mb-1" htmlFor="">
                  Email
                </label>
                <input
                  {...register("email")}
                  name="email"
                  className=" w-full outline-none border-b text-gray-600 placeholder:text-sm  placeholder:font-extralight"
                  type="text"
                  placeholder="enter your email"
                />
                <p className=" mt-1 text-[0.61rem] text-red-500 font-bold tracking-wider">
                  {errors["email"]?.message}
                </p>
              </div>
              <div className=" flex flex-col">
                <label className=" text-lg mb-1" htmlFor="">
                  Password
                </label>
                <div className="flex items-center border-b">
                  <input
                    name="password"
                    {...register("password")}
                    className=" w-full outline-none text-gray-600 placeholder:text-sm  placeholder:font-extralight"
                    type={passwordType}
                    placeholder="enter your password"
                  />
                  <p
                    onClick={ShowHidePassword}
                    className=" outline-none cursor-pointer uppercase font-semibold text-xs tracking-wider"
                  >
                    {passwordStatus}
                  </p>
                </div>

                <p className=" mt-1 text-[0.61rem] tracking-wider text-red-500 font-bold  ">
                  {errors["password"]?.message}
                </p>
              </div>
            </div>
            <button
              type={"submit"}
              className={
                currentUser
                  ? "button w-[102px] h-[43px] bg-green-700 mx-auto"
                  : "w-[102px] h-[43px] button mx-auto"
              }
            >
              {loading ? <ClipLoader color="#ffffff" size={24} /> : "Log In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
