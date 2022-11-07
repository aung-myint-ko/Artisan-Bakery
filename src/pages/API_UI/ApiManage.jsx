import React, { useEffect } from "react";
import axios from "axios";
import TitleBar from "../../components/api/TitleBar";
import { useDispatch, useSelector } from "react-redux";
import { AddRceipesToArray } from "../../store/apiSlice";
import Recipe from "../../components/api/Recipe";

function ApiManage(props) {
  const dispatch = useDispatch();
  const recipesArray = useSelector((state) => state.apiReducer.recipesArray);

  useEffect(() => {
    const fetchingRecipes = async () => {
      const recipes = await axios.get(`/recipes/show`);
      dispatch(AddRceipesToArray(recipes.data));
    };
    fetchingRecipes();
  }, [dispatch]);

  return (
    <>
      <TitleBar />
      <div className=" flex flex-col gap-2">
        {recipesArray.map((recipe) => {
          return (
            <Recipe
              key={recipe._id}
              name={recipe.name}
              imageUrl={recipe.imageUrl}
              slug={recipe.slug}
            />
          );
        })}
      </div>
    </>
  );
}

export default ApiManage;
