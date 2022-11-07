import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FileUploader } from "react-drag-drop-files";
import { ImBin } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import app from "../../firebase";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Create() {
  const navigate = useNavigate();
  const recipeInput = useSelector((state) => state.apiReducer.recipeInput);
  const [recipeDatas, setRecipeDatas] = useState(recipeInput);
  const [image, setImage] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(1);
  const [loading, setLoading] = useState(false);
  const objectsContainValue = Object.values(recipeDatas).includes(undefined);

  //detect recipe information from respective input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeDatas((prev) => {
      return { ...prev, [name]: value };
    });
  };
  //detect image file path from respective input field
  const handleImgChange = (file) => {
    setImgPerc(0);
    setImage((prev) => {
      return (prev = file);
    });
  };
  // upload image to firebase storage and generate image url function
  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
        console.log(snapshot.bytesTransferred);
        console.log(snapshot.totalBytes);
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setRecipeDatas((prev) => {
            return { ...prev, imageUrl: downloadURL };
          });
        });
      }
    );
  };
  //click button and run uploadFile function
  const handlePhoto = () => {
    image && uploadFile(image);
  };
  //cilck button and send all data (name,desc,slug,imgUrl,price) to DB
  const handleSubmit = async () => {
    setLoading(true);
    if (imgPerc === 100) {
      const res = await axios.post("/recipes/add", recipeDatas);
      if (res.status === 201) {
        setLoading(false);
        toast.success("One recipe has added to DB", { duration: 700 });
        setTimeout(() => {
          navigate(`/api/manage`);
        }, 1000);
      }
    }
  };

  return (
    <>
      <div className="p-3 sm:px-10 md:px-16 bg-white w-full flex justify-between items-center border-b border-gray-300 mb-8">
        <Link to={"/api/manage"}>
          <BsArrowLeftShort className=" cursor-pointer" size={30} />
        </Link>
        <h1 className="text-lg font-medium italic text-center">
          {recipeInput.name}
        </h1>
      </div>
      <div className="px-3 sm:px-10 md:px-16 flex flex-col gap-y-8 md:mb-20">
        <div className=" flex flex-col ">
          <label className=" text-lg mb-1" htmlFor="">
            Name
          </label>
          <input
            name="name"
            value={recipeInput.name}
            onChange={handleChange}
            className=" w-full outline-none border px-3 py-2 border-gray-400 text-gray-800 rounded "
            type="text"
          />
        </div>

        <div className=" flex flex-col ">
          <label className=" text-lg mb-1" htmlFor="">
            Variety
          </label>
          <input
            name="variety"
            value={recipeInput.variety}
            onChange={handleChange}
            className=" w-full outline-none border px-3 py-2 border-gray-400 text-gray-800 rounded "
            type="text"
          />
        </div>
        <div className=" flex flex-col ">
          <label className=" text-lg mb-1" htmlFor="">
            Description
          </label>
          <input
            name="desc"
            value={recipeInput.desc}
            onChange={handleChange}
            className=" w-full outline-none border px-3 py-2 border-gray-400 text-gray-800 rounded "
            type="text"
          />
        </div>
        <div className=" flex flex-col ">
          <label className=" text-lg mb-1" htmlFor="">
            Price
          </label>
          <input
            name="price"
            value={recipeInput.price}
            onChange={handleChange}
            className=" w-full outline-none border px-3 py-2 border-gray-400 text-gray-800 rounded "
            type="text"
          />
        </div>
        <div className=" flex flex-col ">
          <label className=" text-lg mb-1" htmlFor="">
            Image
          </label>

          <div className="flex gap-x-6 items-center">
            <FileUploader
              label="  Upload or drop a file right here"
              handleChange={handleImgChange}
              name="file"
            />
            {image && (
              <>
                <LazyLoadImage
                  src={URL.createObjectURL(image)}
                  className=" max-w-[250px] border border-gray-300"
                  alt=""
                />
                <h1>{imgPerc > 0 && imgPerc + "%"}</h1>
                <button
                  disabled={imgPerc === 100}
                  onClick={handlePhoto}
                  className={`px-5 py-2 cursor-pointer bg-green-700 text-white rounded tracking-wider hover:shadow-lg ${
                    imgPerc === 100 && "cursor-default"
                  }`}
                >
                  {recipeDatas.imageUrl && imgPerc === 100 ? "Done" : "Upload"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-3 sm:px-10 md:px-16 fixed bottom-0 left-0 w-full bg-white flex justify-end items-center gap-5 border-t border-gray-400 ">
        <button
          disabled={objectsContainValue}
          onClick={handleSubmit}
          className={`px-7 py-2 cursor-pointer  rounded tracking-wider  ${
            objectsContainValue
              ? " text-gray-600 bg-slate-300 cursor-default"
              : "bg-green-700 text-white hover:shadow-lg"
          }`}
        >
          {loading ? <ClipLoader color="#ffffff" /> : "Publish"}
        </button>
        <div className=" bin p-2 cursor-pointer border border-gray-400 rounded hover:shadow-lg hover:bg-red-600">
          <ImBin size={22} />
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Create;
