import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ImBin } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, deleteObject } from "firebase/storage";
import ClipLoader from "react-spinners/ClipLoader";

function DeleteButton({ name, slug }) {
  const storage = getStorage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const recipe = await axios.get(
      `https://artisan-bakery-data.onrender.com/api/recipes/show/${slug}`
    );
    const deleteProcess = await axios.delete(
      `https://artisan-bakery-data.onrender.com/api/recipes/delete/${slug}`
    );
    if (deleteProcess.status === 200) {
      setLoading(false);
      //cleaning old image from firebase storage
      const desertRef = ref(storage, recipe.data.imageUrl);
      deleteObject(desertRef)
        .then(() => {})
        .catch((error) => {});
      toast.success(`${name} is delected`);
      setTimeout(() => {
        navigate(`/api/manage`);
      }, 500);
    }
  };

  return (
    <>
      <div
        onClick={handleDelete}
        className=" bin p-2 cursor-pointer border border-gray-400 rounded hover:shadow-lg hover:bg-red-600"
      >
        {loading ? <ClipLoader color="#6a6d6c" /> : <ImBin size={22} />}
      </div>
      <Toaster />
    </>
  );
}

export default DeleteButton;
