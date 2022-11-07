import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LoadingMessage from "../../components/Menu/LoadingMessage";
import RecipeCardDetails from "../../components/Menu/RecipeCardDetails";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import { UpdatingRoute } from "../../store/cartSlice";

function RecipeCardDetailsPage(props) {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.recipesReducer.recipeInfo);

  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(UpdatingRoute(pathname));
    if (name) {
      document.title = `${name} | Artisan Bakery`;
    }
  }, []);

  return (
    <>
      <RecipeCardDetails />
    </>
  );
}

export default RecipeCardDetailsPage;
