import axios from "axios";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AddingRecipeInfo } from "../../store/recipeSlice";

function RecipeCard({ recipeDetails }) {
  const dispatch = useDispatch();
  const { name, imageUrl, slug, variety } = recipeDetails;
  const fetchSpecificRecipe = async () => {
    const singleRecipe = await axios.get(`/recipes/show/${slug}`);
    dispatch(AddingRecipeInfo(singleRecipe.data));
  };
  return (
    <>
      <Link to={`/menu/${variety}/${slug}`}>
        <div
          onClick={fetchSpecificRecipe}
          className="mx-auto flex flex-col items-center cursor-pointer"
        >
          <div className="">
            <LazyLoadImage
              className={` w-36 h-36 md:w-44 md:h-44 rounded-full border border-slate-300 bg-slate-200 duration-300 `}
              src={imageUrl}
              alt=""
            />
          </div>

          <p className="text-base md:text-lg w-2/3 mt-3 text-center  ">
            {name}
          </p>
        </div>
      </Link>
    </>
  );
}

export default RecipeCard;
