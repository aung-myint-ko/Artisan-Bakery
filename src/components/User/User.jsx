import axiosInstance from "../../axiosInstance";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddingCurrentUserInfo,
  CleaningCart,
  RemovingCurrentUserInfo,
} from "../../store/cartSlice";
import { useState } from "react";
import { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthLoadingStart, AuthLoadingStop } from "../../store/loadingSlice";
import axios from "axios";

axios.defaults.withCredentials = true;

function User(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [imgLoad, setImgLoad] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const { authLoading } = useSelector((state) => state.loadingReducer);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await axiosInstance.get("/user/info");
      sessionStorage.setItem("user", JSON.stringify(userInfo.data));
    };
    getUserInfo();
  }, []);

  //User logout function
  const handleLogout = async () => {
    dispatch(AuthLoadingStart());

    const logout = await axiosInstance.post(`/user/logout`);
    if (logout.status === 200) {
      dispatch(AuthLoadingStop());
      dispatch(RemovingCurrentUserInfo());
      dispatch(CleaningCart());
      navigate("/");
      setTimeout(() => {
        sessionStorage.removeItem("user");
      }, 1000);
    }
  };
  //Get image file path
  const TraceImageUrl = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    setImgLoad(true);
  };

  useEffect(() => {
    const postImageToDB = async () => {
      await axiosInstance.put("/user/image", { image: imageUrl });
      const userInfo = await axiosInstance.get(`/user/info`);
      dispatch(AddingCurrentUserInfo(userInfo.data));
      sessionStorage.setItem("user", JSON.stringify(userInfo.data));
      setImgLoad(false);
    };
    imageUrl && postImageToDB();
  }, [imageUrl, dispatch]);

  return (
    <div className="px-4 md:px-14 lg:px-20 py-10">
      <h1 className=" text-3xl md:text-3xl mb-10 tracking-wider font-semibold">
        Account Details
      </h1>
      {/*Divide the page into 2 part */}
      <div className="flex flex-col md:flex-row gap-y-9 md:gap-0 ">
        <div className=" mx-auto md:mx-0 relative w-60 h-60 rounded-full bg-slate-200  cursor-pointer hover:bg-slate-300 hover:shadow-lg  ">
          {imgLoad ? (
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <ClipLoader color="#6b320a" size={50} />
            </div>
          ) : currentUser.imageUrl ? (
            <LazyLoadImage
              onChange={(e) => e.preventDefault()}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full"
              src={currentUser.imageUrl}
              alt="user-image"
            />
          ) : (
            <LazyLoadImage
              onChange={(e) => e.preventDefault()}
              className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                imageUrl ? "w-[90%] h-[90%] rounded-full" : "w-28"
              } `}
              src={imageUrl ? imageUrl : "/images/camera.png"}
              alt="user-image"
            />
          )}
          <input
            onChange={TraceImageUrl}
            className=" w-60 h-60 cursor-pointer opacity-0"
            accept="image/png, image/jpeg, image/webp"
            type="file"
          />
        </div>

        <div className=" md:pl-14 lg:px-20 w-full lg:w-[50%] tracking-wider flex flex-col gap-y-8 ">
          <div>
            <h1 className=" font-semibold text-2xl pb-2 border-b border-slate-300">
              Name
            </h1>
            <p className="pt-2 text-xl opacity-90 capitalize">
              {currentUser.name}
            </p>
          </div>
          <div>
            <h1 className=" font-semibold text-2xl pb-2 border-b border-slate-300">
              Email
            </h1>
            <p className="pt-2 text-base sm:text-xl opacity-90">
              {currentUser.email}
            </p>
          </div>
          <div>
            <h1 className=" font-semibold text-2xl pb-2 border-b border-slate-300">
              Status
            </h1>
            <p className="pt-2 text-xl opacity-90">Sliver Member</p>
          </div>
          <button
            onClick={handleLogout}
            className=" py-[10px] bg-[#974103] w-32 flex justify-center items-center rounded-full text-white border border-white text-lg hover:bg-[#b15412]"
          >
            {authLoading ? <ClipLoader color="#ffffff" size={28} /> : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;
