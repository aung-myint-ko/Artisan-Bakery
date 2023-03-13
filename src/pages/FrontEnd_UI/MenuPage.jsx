import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import { UpdatingRoute } from "../../store/cartSlice";
import { CleanigRecipeInfo } from "../../store/recipeSlice";

function MenuPage({ setProgress }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(UpdatingRoute(pathname));
    dispatch(CleanigRecipeInfo());
  }, [dispatch, pathname]);
  useDocumentTitle(`Menu`);

  return (
    <>
      <Menu setProgress={setProgress} />
    </>
  );
}

export default MenuPage;
