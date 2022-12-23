import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { FileUploader } from "react-drag-drop-files";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";
import app from "../../firebase";
import DeleteButton from "./DeleteButton";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Update({ name, variety, desc, imageUrl, price, slug }) {
  const navigate = useNavigate();
  const [recipeDatas, setRecipeDatas] = useState({
    name,
    variety,
    desc,
    imageUrl,
    price,
  });
  const [image, setImage] = useState(imageUrl);
  const [updated, setUpdated] = useState(false);
  const [imgPerc, setImgPerc] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdated(true);
    setRecipeDatas((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleImgChange = (file) => {
    setImage(file);
  };

  const uploadFile = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setRecipeDatas((prev) => {
            return { ...prev, imageUrl: downloadURL };
          });
          setUpdated(true);
        });
      }
    );
  };
  //Click button, image uploading process will start.
  const handlePhoto = () => {
    if (image) {
      uploadFile(image);
      //cleaning old image from firebase storage
      const storage = getStorage();
      const desertRef = ref(storage, recipeDatas.imageUrl);
      deleteObject(desertRef)
        .then(() => {})
        .catch((error) => {});
    }
  };

  //Send all data to DB
  const handleSubmit = async () => {
    setLoading(true);
    const res = await axios.put(
      `https://artisan-bakery-data.onrender.com/api/recipes/update/${slug}`,
      recipeDatas
    );
    if (res.status === 201) {
      setTimeout(() => {
        navigate(`/api/manage`);
      }, 1000);
      setLoading(false);
      toast.success("Successfully updated", { duration: 700 });
    }
  };

  // typeof image === "object" && setImgPerc(0);

  return (
    <>
      <div className="p-3 sm:px-10 md:px-16 bg-white w-full flex justify-between items-center border-b border-gray-300 mb-8">
        <Link to={"/api/manage"}>
          <BsArrowLeftShort className=" cursor-pointer" size={30} />
        </Link>
        <h1 className="text-lg font-medium italic text-center">
          {recipeDatas.name}
        </h1>
      </div>
      <div className="px-3 sm:px-10 md:px-16 flex flex-col gap-y-8 md:mb-20">
        <div className=" flex flex-col ">
          <label className=" text-lg mb-1" htmlFor="">
            Name
          </label>
          <input
            name="name"
            value={recipeDatas.name}
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
            value={recipeDatas.variety}
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
            value={recipeDatas.desc}
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
            value={recipeDatas.price}
            onChange={handleChange}
            className=" w-full outline-none border px-3 py-2 border-gray-400 text-gray-800 rounded "
            type="text"
          />
        </div>
        <div className=" flex flex-col ">
          <label className=" text-lg mb-1" htmlFor="">
            Image
          </label>

          <div className="flex gap-x-6 items-center border border-gray-400 rounded px-3 py-2">
            <FileUploader
              label="  Upload or drop a file right here"
              handleChange={handleImgChange}
              name="file"
            />
            {/* If file uploader detect input is string (image url), */}
            {typeof image === "string" ? (
              <>
                <LazyLoadImage
                  src={image}
                  className=" max-w-[250px] border border-gray-300"
                  alt=""
                />
              </>
            ) : /* If file uploader detect input is object (image file path), */
            typeof image === "object" ? (
              <>
                <LazyLoadImage
                  src={URL.createObjectURL(image)}
                  className="max-w-[250px] border border-gray-300"
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
            ) : null}
          </div>
        </div>
      </div>
      <div className="p-3 sm:px-10 md:px-16 fixed bottom-0 left-0 w-full bg-white flex justify-end items-center gap-5 border-t border-gray-400 ">
        <button
          disabled={!updated}
          onClick={handleSubmit}
          className={`px-7 py-2 cursor-pointer  rounded tracking-wider  ${
            !updated
              ? " text-gray-600 bg-slate-300 cursor-default"
              : "bg-green-700 text-white hover:shadow-lg"
          }`}
        >
          {loading ? <ClipLoader color="#ffffff" /> : "Update"}
        </button>
        <DeleteButton name={recipeDatas.name} slug={slug} />
      </div>
      <Toaster />
    </>
  );
}

export default Update;
