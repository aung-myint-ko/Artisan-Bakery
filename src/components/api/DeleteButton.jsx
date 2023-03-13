import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";
import { ImBin } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function DeleteButton({ name, slug }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const deleteProcess = await axiosInstance.delete(`/recipe/${slug}`);
    if (deleteProcess.status === 200) {
      setLoading(false);
      toast.success(`${name} is delected`, { duration: 700 });
      setTimeout(() => {
        navigate(`/api/manage`);
      }, 1000);
    }
  };

  return (
    <>
      <div
        onClick={handleDelete}
        className={` h-11 p-2 cursor-pointer border border-gray-400 rounded hover:shadow-lg bg-red-600  `}
      >
        {loading ? (
          <ClipLoader color="#ffffff" size={24} />
        ) : (
          <ImBin color="#ffffff" size={24} />
        )}
      </div>
    </>
  );
}

export default DeleteButton;
