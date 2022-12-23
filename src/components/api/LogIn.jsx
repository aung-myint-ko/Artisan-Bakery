import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginError, LoginStart, LoginSuccess } from "../../store/apiSlice";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required("Please enter email"),
    password: yup.string().required("Please enter password").min(4),
  })
  .required();

function LogIn(props) {
  const { currentUser, error } = useSelector((state) => state.apiReducer);
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordStatus, setPasswordStatus] = useState("show");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const OnSubmit = async (formData) => {
    try {
      dispatch(LoginStart());
      const postUser = await axios.post(
        `https://artisan-bakery-data.onrender.com/api/auth/admin/signin`,
        formData
      );
      sessionStorage.setItem("admin", JSON.stringify(postUser.data));
      postUser.status === 200 && toast.success("Successfully Login");
      dispatch(LoginSuccess(postUser.data));
      setTimeout(() => {
        naviagate(`/api/manage`);
      }, 1000);
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
          <h1 className=" choco font_title font-extrabold text-center text-2xl tracking-widest mb-2 ">
            ARTISAN
          </h1>

          {error ? (
            <p className=" mb-8 text-sm tracking-wide text-red-500 font-bold text-center ">
              {error}
            </p>
          ) : (
            <p className=" mb-8 text-sm text-center italic font-light">
              Note: Only admins are allow to log in.
            </p>
          )}
          <form onSubmit={handleSubmit(OnSubmit)} action="">
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
                currentUser ? "button bg-green-700 mx-auto" : "button mx-auto"
              }
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
