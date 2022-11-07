import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AddingAllVarietyRecipes } from "../../store/recipeSlice";
import LoadingMessage from "./LoadingMessage";
import MenuNavigation from "./MenuNavigation";
import RecipeCard from "./RecipeCard";

function AllMenu(props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { allVarietyRecipes, recipeInfo } = useSelector(
    (state) => state.recipesReducer
  );
  console.log(recipeInfo);

  useEffect(() => {
    const handleAll = async () => {
      const cake = await axios.get("/recipes/show/find?variety=cake");
      const burger = await axios.get("/recipes/show/find?variety=burger");
      const bread = await axios.get("/recipes/show/find?variety=bread");
      const donut = await axios.get("/recipes/show/find?variety=donut");
      const cookie = await axios.get("/recipes/show/find?variety=cookie");
      const drink = await axios.get("/recipes/show/find?variety=drink");
      dispatch(
        AddingAllVarietyRecipes([
          cake.data,
          burger.data,
          bread.data,
          donut.data,
          cookie.data,
          drink.data,
        ])
      );
    };
    handleAll();
  }, [dispatch]);

  return (
    <>
      <h1 className=" text-3xl md:text-4xl py-6 md:py-8 text-center tracking-wider font-semibold border-b border-gray-300 ">
        Menu
      </h1>

      <p className="hidden md:block px-4 md:px-14 lg:px-20 bg-slate-50 py-3 md:py-5 border-b border-gray-300 capitalize">
        {pathname.split("/")[1]} / {!pathname.split("/")[2] && "All"}
      </p>

      <div className=" lg:flex px-0 lg:px-20 pt-0 pb-16 md:pb-20   ">
        <MenuNavigation />
        <div className=" flex flex-col gap-y-10 w-full">
          {allVarietyRecipes.length === 0 ? (
            <LoadingMessage />
          ) : (
            allVarietyRecipes.map((allVarietyRecipe, index) => (
              <RecipeShowCase key={index} allVarietyRecipe={allVarietyRecipe} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

const RecipeShowCase = ({ allVarietyRecipe }) => {
  return (
    <div>
      <h1 className=" text-xl md:text-3xl px-5 md:px-14 lg:px-0 pt-10 pb-7 lg:pb-5 mb-8 border-b capitalize border-gray-200 tracking-wider font-semibold ">
        {allVarietyRecipe[0].variety}
      </h1>
      <div className=" grid-cols-2 sm:grid-cols-3 grid w-full gap-x-4 gap-y-10 sm:gap-x-3">
        {allVarietyRecipe.map((recipes) => (
          <RecipeCard key={recipes._id} recipeDetails={recipes} />
        ))}
      </div>
    </div>
  );
};

export default AllMenu;
