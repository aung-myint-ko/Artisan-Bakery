import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  AddingCurrentUserInfo,
  AddingErrorMessage,
  CleaningErrorMessage,
  CloseMessage,
} from "../../store/cartSlice";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthLoadingStart, AuthLoadingStop } from "../../store/loadingSlice";
import axiosInstance from "../../axiosInstance";

axios.defaults.withCredentials = true;

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Please enter name").min(4),
    email: yup.string().email().required("Please enter email"),
    password: yup.string().required("Please enter password").min(4),
  })
  .required();

function UserSignUp(props) {
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordStatus, setPasswordStatus] = useState("show");
  const { pastRoute, errorMessage } = useSelector((state) => state.cartReducer);
  const { authLoading } = useSelector((state) => state.loadingReducer);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Clean Error message when page refresh
  useEffect(() => {
    dispatch(CleaningErrorMessage());
  }, [dispatch]);

  //Submit user data to api and create account
  const OnSubmit = async (formdata) => {
    try {
      console.log(formdata);
      dispatch(AuthLoadingStart());
      const request = await axiosInstance.post("/user/signup", formdata);
      dispatch(AddingCurrentUserInfo(request.data));
      sessionStorage.setItem("user", JSON.stringify(request.data));
      if ((request.status = 201)) {
        dispatch(AuthLoadingStop());
        naviagate(pastRoute);
        dispatch(CloseMessage());
      }
    } catch (err) {
      dispatch(AuthLoadingStop());
      if (
        err.response.data.message.includes("duplicate key error collection")
      ) {
        dispatch(
          AddingErrorMessage(
            "Email is already taken. Please try a different one."
          )
        );
      } else {
        dispatch(AddingErrorMessage(err.response.data.message));
      }
    }
  };

  //Show & hide function for password input
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
      <div className=" w-full h-screen bg-white/90 fixed top-0 left-0 z-50 flex justify-center items-center">
        <div className=" sm:w-[75%] lg:w-[60%] sm:py-10 lg:py-0 grid grid-cols-1 lg:grid-cols-2 sm:bg-slate-50 lg:bg-white sm:border sm:shadow-md z-50 ">
          <div className=" lg:bg-[#b15412] lg:text-white px-4 sm:px-7  flex flex-col justify-center ">
            <div className=" w-fit mx-auto p-4 bg-slate-200 lg:bg-white rounded-full lg:mb-6">
              <LazyLoadImage
                className="w-20 h-20 "
                src="/images/icon.png"
                alt=""
              />
            </div>
            <div className="hidden lg:block text-center mb-9">
              <h1 className=" text-2xl font-semibold mb-4 ">
                Welcome To Artisan
              </h1>
              <p className=" text-xs">
                Join Artisan to earn Stars for free food and drinks, any way you
                pay. Get access to mobile ordering, a birthday Reward, and more.
              </p>
            </div>
            <p className="hidden lg:block">© 2022 Artisan</p>
          </div>

          <div className=" px-4 sm:px-10 md:px-20 lg:px-6 py-6 lg:py-8">
            <div className="mb-4 lg:mb-5">
              {/* This error message will come from api [Mobile UI] */}
              {errorMessage && (
                <p className=" lg:hidden px-1 py-2 mb-3 text-xs bg-red-500 text-white text-center overflow-hidden tracking-wider">
                  {errorMessage}
                </p>
              )}
              <h1 className="text-center text-2xl font-semibold ">
                Create Account
              </h1>
              {/* This error message will come from api [PC UI] */}
              {errorMessage && (
                <p className=" hidden lg:block px-1 py-2 mt-3 text-xs bg-red-500 text-white text-center overflow-hidden tracking-wider">
                  {errorMessage}
                </p>
              )}
            </div>
            <p className="lg:hidden text-xs text-center mb-7">
              Join Artisan to earn Stars for free food and drinks, any way you
              pay. Get access to mobile ordering, a birthday Reward, and more.
            </p>
            <form onSubmit={handleSubmit(OnSubmit)} action="">
              <div className="flex flex-col gap-y-4 mb-7">
                <div>
                  <label htmlFor="">Name</label>
                  <input
                    {...register("name")}
                    className=" w-full outline-none border-b text-sm pb-[1px] sm:bg-slate-50 lg:bg-white text-gray-700"
                    type="text"
                    autoFocus
                  />
                  <p className=" mt-1 text-[0.61rem] tracking-wider text-red-500 font-bold ">
                    {errors["name"]?.message}
                  </p>
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <input
                    {...register("email")}
                    className=" w-full outline-none border-b text-sm pb-[1px] sm:bg-slate-50 lg:bg-white text-gray-700"
                    type="email"
                  />
                  <p className=" mt-1 text-[0.61rem] tracking-wider text-red-500 font-bold ">
                    {errors["email"]?.message}
                  </p>
                </div>
                <div>
                  <label htmlFor="">Password</label>
                  <div className="flex items-center border-b">
                    <input
                      {...register("password")}
                      className=" w-full outline-none  text-sm pt-1 pb-[1px] sm:bg-slate-50 lg:bg-white text-gray-700"
                      type={passwordType}
                      required
                    />
                    <p
                      onClick={ShowHidePassword}
                      className=" outline-none cursor-pointer uppercase font-semibold text-xs tracking-wider"
                    >
                      {passwordStatus}
                    </p>
                  </div>

                  <p className=" mt-1 text-[0.61rem] tracking-wider text-red-500 font-bold ">
                    {errors["password"]?.message}
                  </p>
                </div>
              </div>
              <button
                type={"submit"}
                className=" w-[190px] h-[43px] button mx-auto mb-6"
              >
                {authLoading ? (
                  <ClipLoader color="#ffffff" size={28} />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <p className="text-xs">
              If you already have account, please{" "}
              <Link to={"/login"} className=" underline">
                log in
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSignUp;
