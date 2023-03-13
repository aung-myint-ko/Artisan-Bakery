import React, { useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import Marquee from "react-fast-marquee";
import { useDispatch, useSelector } from "react-redux";
import { AddingCakes } from "../../store/recipeSlice";
import RecipeCard from "./RecipeCard";

function FeaturedRecipe({ variety }) {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipesReducer);

  useEffect(() => {
    const fetchCakes = async () => {
      const cakes = await axiosInstance.get(`/recipe/find?variety=${variety}`);
      dispatch(AddingCakes(cakes.data));
    };
    fetchCakes();
  }, [variety, dispatch]);

  return (
    <div className="px-4 md:px-14 lg:px-20 py-14 md:pt-12 md:pb-20">
      <h1 className=" text-2xl font-semibold mb-9">You may also like</h1>
      <Marquee direction="right" pauseOnHover="true" gradientWidth={10}>
        {recipes.map((recipe) => (
          <div className="mx-4" key={recipe._id}>
            <RecipeCard recipeDetails={recipe} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default FeaturedRecipe;
