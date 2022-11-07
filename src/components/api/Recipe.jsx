import React from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Recipe({ imageUrl, name, slug }) {
  return (
    <div className=" px-3 sm:px-10 md:px-16 py-2 flex justify-between items-center">
      <div className="flex items-center gap-x-3">
        <LazyLoadImage
          className=" w-14 h-14 rounded-md  border border-gray-300"
          src={imageUrl}
          alt=""
        />
        <h1 className=" text-lg font-medium ">{name}</h1>
      </div>
      <Link to={`/api/manage/update/${slug}`}>
        <FiEdit size={25} />
      </Link>
    </div>
  );
}

export default Recipe;
