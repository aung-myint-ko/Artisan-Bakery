import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Update from "../../components/api/Update";

function ApiUpdate(props) {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState();
  useEffect(() => {
    const getSingleRecipe = async () => {
      const recipe = await axios.get(`/recipes/show/${slug}`);
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
          imageUrl={recipe.imageUrl}
          price={recipe.price}
          slug={slug}
        />
      )}
    </>
  );
}

export default ApiUpdate;
