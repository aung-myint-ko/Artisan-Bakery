import axiosInstance from "../../axiosInstance";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Update from "../../components/api/Update";

function ApiUpdate(props) {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState();
  useEffect(() => {
    const getSingleRecipe = async () => {
      const recipe = await axiosInstance.get(`/recipe/${slug}`);
      setRecipe(recipe.data);
    };
    getSingleRecipe();
  }, [slug]);

  return (
    <>
      {recipe && (
        <Update
          name={recipe.name}
          variety={recipe.variety}
          desc={recipe.desc}
          image={recipe.imageUrl}
          price={recipe.price}
          slug={slug}
        />
      )}
    </>
  );
}

export default ApiUpdate;
