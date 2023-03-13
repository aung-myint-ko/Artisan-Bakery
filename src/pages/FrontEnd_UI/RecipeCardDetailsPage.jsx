import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import RecipeCardDetails from "../../components/Menu/RecipeCardDetails";
import { UpdatingRoute } from "../../store/cartSlice";

function RecipeCardDetailsPage({ setProgress }) {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.recipesReducer.recipeInfo);

  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(UpdatingRoute(pathname));
    if (name) {
      document.title = `${name} | Artisan Bakery`;
    }
  }, [dispatch, name, pathname]);

  return (
    <>
      <RecipeCardDetails setProgress={setProgress} />
    </>
  );
}

export default RecipeCardDetailsPage;
