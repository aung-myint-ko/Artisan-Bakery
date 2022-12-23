import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import app from "../../firebase";
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
import PageLoading from "../../custom-hooks/PageLoading";

function User(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [imgLoad, setImgLoad] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [image, setImage] = useState(null);
  const { authLoading } = useSelector((state) => state.loadingReducer);

  //user logout function
  const handleLogout = async () => {
    dispatch(AuthLoadingStart());
    const logout = await axios.post(
      `https://artisan-bakery-data.onrender.com/api/auth/logout`
    );
    if (logout.status === 200) {
      dispatch(AuthLoadingStop());
      navigate("/");
      sessionStorage.removeItem("user");
      dispatch(RemovingCurrentUserInfo());
      dispatch(CleaningCart());
    }
  };
  //get image file path
  const TraceImageUrl = (e) => {
    const data = e.target.files[0];
    setImageFile(data);
  };
  //store image file to firebase and make url
  const uploadFile = (file) => {
    setImgLoad(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    if (imageFile) {
      uploadFile(imageFile);
      const storage = getStorage();
      if (currentUser.imageUrl) {
        const desertRef = ref(storage, currentUser.imageUrl);
        deleteObject(desertRef)
          .then(() => {})
          .catch((error) => {});
      }
    }
  }, [imageFile]);
  useEffect(() => {
    const postImageToDB = async () => {
      await axios.put(
        "https://artisan-bakery-data.onrender.com/api/auth/customer/image",
        { imageUrl: image }
      );
      const userInfo = await axios.get(
        `https://artisan-bakery-data.onrender.com/api/auth/customer/${currentUser._id}`
      );
      dispatch(AddingCurrentUserInfo(userInfo.data));
      sessionStorage.setItem("user", JSON.stringify(userInfo.data));
      setImgLoad(false);
    };
    image && postImageToDB();
  }, [image]);
  return (
    <>
      {authLoading ? (
        <PageLoading />
      ) : (
        <div className="px-4 md:px-14 lg:px-20 py-10">
          <h1 className=" text-3xl md:text-3xl mb-10 tracking-wider font-semibold">
            Account Details
          </h1>
          {/*Divide the page into 2 part */}
          <div className="flex flex-col md:flex-row gap-y-9 md:gap-0 ">
            <div
              onClick={TraceImageUrl}
              className=" mx-auto md:mx-0 relative w-60 h-60 rounded-full bg-slate-200  cursor-pointer hover:bg-slate-300 hover:shadow-lg  "
            >
              {imgLoad ? (
                <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <ClipLoader color="#6b320a" size={50} />
                </div>
              ) : currentUser.imageUrl ? (
                <LazyLoadImage
                  onChange={(e) => e.preventDefault()}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full  rounded-full"
                  src={currentUser.imageUrl}
                  alt=""
                />
              ) : (
                <LazyLoadImage
                  onChange={(e) => e.preventDefault()}
                  className={` absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                    imageFile ? "w-full h-full rounded-full" : "w-28"
                  } `}
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : "/images/camera.png"
                  }
                  alt=""
                />
              )}
              <input
                onChange={TraceImageUrl}
                className=" w-60 h-60 cursor-pointer opacity-0"
                accept="image/png, image/jpeg, image/webp"
                type="file"
                name=""
                id=""
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
                className=" py-[10px] bg-[#974103] w-32 rounded-full text-white border border-white text-lg hover:bg-[#b15412]"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
