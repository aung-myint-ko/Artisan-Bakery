import axiosInstance from "../../axiosInstance";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AddingCakes } from "../../store/recipeSlice";
import LoadingMessage from "./LoadingMessage";
import MenuNavigation from "./MenuNavigation";
import RecipeCard from "./RecipeCard";

function Menu({ setProgress }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { menuLoading } = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    setProgress(30);
    const fetchRecipe = async () => {
      const recipes = await axiosInstance.get(
        `/recipe/find?variety=${pathname.split("/")[2]}`
      );
      recipes.status === 200 && setProgress(100);

      dispatch(AddingCakes(recipes.data));
    };
    fetchRecipe();
  }, [pathname, dispatch, setProgress]);

  return (
    <>
      <h1 className=" text-3xl md:text-4xl py-6 md:py-8 text-center tracking-wider font-semibold border-b border-gray-300 ">
        Menu
      </h1>

      <p className="hidden md:block px-4 md:px-14 lg:px-20 bg-slate-50 py-3 md:py-5 border-b border-gray-300 capitalize">
        {pathname.split("/")[1]} / {pathname.split("/")[2]}
      </p>

      <div className=" lg:flex px-0 lg:px-20 pt-0 pb-16 md:pb-20">
        <MenuNavigation />
        {menuLoading ? (
          <div className=" flex flex-col gap-y-10 w-full">
            <LoadingMessage />
          </div>
        ) : (
          <RecipeShowCase />
        )}
      </div>
    </>
  );
}

const RecipeShowCase = () => {
  const { pathname } = useLocation();
  const { recipes } = useSelector((state) => state.recipesReducer);
  return (
    <div className="w-full">
      <h1 className=" text-xl md:text-3xl px-5 md:px-14 lg:px-0 pt-10 pb-7 lg:pb-5 mb-12 border-b capitalize border-gray-200 tracking-wider font-semibold ">
        {pathname.split("/")[2]}
      </h1>
      <div className=" grid-cols-2 sm:grid-cols-3 grid w-full gap-x-4 gap-y-10 sm:gap-x-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipeDetails={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
