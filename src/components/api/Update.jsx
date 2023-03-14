import React, { useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import DeleteButton from "./DeleteButton";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//forms validation schema for recipe adding
const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name field is require"),
    variety: yup.string().required("Variety field is require"),
    desc: yup.string().required("Description field is require"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .required("Price field is require")
      .positive("Price must be a positive number")
      .min(100, "Price must be at least 100"),
  })
  .required();

function Update({ name, variety, desc, image, price, slug }) {
  const navigate = useNavigate();
  const [recipeDatas, setRecipeDatas] = useState({
    name,
    variety,
    desc,
    image,
    price,
  });
  const [newRecipeDatas, setNewRecipeDatas] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdated(true);
    setRecipeDatas((prev) => ({ ...prev, [name]: value }));
    setNewRecipeDatas((prev) => ({ ...prev, [name]: value }));
  };
  const handleImgChange = (e) => {
    setUpdated(true);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageUrl(reader.result);
      setNewRecipeDatas((prev) => ({ ...prev, image: reader.result }));
    };
  };

  //Send all data to DB
  const onSubmit = async () => {
    setLoading(true);
    const res = await axiosInstance.put(`/recipe/${slug}`, newRecipeDatas);
    if (res.status === 201) {
      toast.success("Successfully updated", { duration: 700 });
      setTimeout(() => {
        navigate(`/api/manage`);
      }, 1000);
      setLoading(false);
    }
  };

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
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="px-3 sm:px-10 md:px-16 flex flex-col gap-y-8 md:mb-20">
          <div className=" flex flex-col ">
            <label className=" text-lg mb-1" htmlFor="">
              Name
            </label>
            <input
              {...register("name")}
              name="name"
              value={recipeDatas.name}
              onChange={handleChange}
              className=" w-full outline-none border px-3 py-2 border-gray-400 text-gray-800 rounded "
              type="text"
            />
            <p className=" mt-1 text-[0.61rem] text-red-500 font-bold tracking-wider">
              {errors["name"]?.message}
            </p>
          </div>
          <div className=" flex flex-col ">
            <label className=" text-lg mb-1" htmlFor="">
              Variety
            </label>
            <input
              {...register("variety")}
              name="variety"
              value={recipeDatas.variety}
              onChange={handleChange}
              className=" w-full outline-none border px-3 py-2 border-gray-400 text-gray-800 rounded "
              type="text"
            />
            <p className=" mt-1 text-[0.61rem] text-red-500 font-bold tracking-wider">
              {errors["variety"]?.message}
            </p>
          </div>
          <div className=" flex flex-col ">
            <label className=" text-lg mb-1" htmlFor="">
              Description
            </label>
            <input
              {...register("desc")}
              name="desc"
              value={recipeDatas.desc}
              onChange={handleChange}
              className=" w-full outline-none border px-3 py-2 border-gray-400 text-gray-800 rounded "
              type="text"
            />
            <p className=" mt-1 text-[0.61rem] text-red-500 font-bold tracking-wider">
              {errors["desc"]?.message}
            </p>
          </div>
          <div className=" flex flex-col ">
            <label className=" text-lg mb-1" htmlFor="">
              Price
            </label>
            <input
              {...register("price")}
              name="price"
              value={recipeDatas.price}
              onChange={handleChange}
              className=" w-full outline-none border px-3 py-2 border-gray-400 text-gray-800 rounded "
              type="text"
            />
            <p className=" mt-1 text-[0.61rem] text-red-500 font-bold tracking-wider">
              {errors["price"]?.message}
            </p>
          </div>
          <div className=" flex flex-col ">
            <label className=" text-lg mb-1" htmlFor="">
              Image
            </label>
            <div
              className={`relative gap-x-6 flex justify-center items-center w-full outline-none border px-3 py-4 md:py-5 border-gray-400 rounded ${"h-[216px] md:h-[290px] bg-gray-100"}`}
            >
              {!image && (
                <div className=" opacity-60 tracking-wider absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center ">
                  <BiImage size={28} className=" m-2 opacity-80" />
                  <p className=" text-xs md:text-base w-[180px] md:w-[240px]">
                    Drag or paste image here
                  </p>
                </div>
              )}
              <input
                onChange={handleImgChange}
                className=" w-full h-full cursor-pointer opacity-0"
                type="file"
              />
              <LazyLoadImage
                src={imageUrl ? imageUrl : recipeDatas.image}
                className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[200px] h-[200px] md:max-w-[250px] md:h-[250px]  border border-gray-300"
                alt="recipe-image"
              />
            </div>
          </div>
        </div>
        <div className="p-3 sm:px-10 md:px-16 fixed bottom-0 left-0 w-full bg-white flex justify-end items-center gap-5 border-t border-gray-400 ">
          <button
            disabled={!updated}
            type={"submit"}
            className={` h-11 w-[120px] px-7 py-2 cursor-pointer rounded tracking-wider ${
              !updated
                ? " text-gray-600 bg-slate-300 cursor-default"
                : "bg-green-700 text-white hover:shadow-lg"
            }`}
          >
            {loading ? <ClipLoader color="#ffffff" size={24} /> : "Update"}
          </button>
          <DeleteButton name={recipeDatas.name} slug={slug} />
        </div>
      </form>

      <Toaster />
    </>
  );
}

export default Update;
