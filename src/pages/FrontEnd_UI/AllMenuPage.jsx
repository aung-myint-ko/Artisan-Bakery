import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import AllMenu from "../../components/Menu/AllMenu";
import { UpdatingRoute } from "../../store/cartSlice";
import { CleanigRecipeInfo } from "../../store/recipeSlice";

function AllMenuPage({ setProgress }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(UpdatingRoute(pathname));
    dispatch(CleanigRecipeInfo());
  }, [dispatch, pathname, setProgress]);

  useDocumentTitle("All Menu");
  return (
    <>
      <AllMenu setProgress={setProgress} />
    </>
  );
}

export default AllMenuPage;
