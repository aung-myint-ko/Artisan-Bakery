import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import PageLoading from "../../custom-hooks/PageLoading";
import { UpdatingRoute } from "../../store/cartSlice";
import {
  PageTransitionStart,
  PageTransitionStop,
} from "../../store/loadingSlice";
import { CleanigRecipeInfo } from "../../store/recipeSlice";

function MenuPage(props) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { pageTransition } = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    dispatch(PageTransitionStart());
    dispatch(UpdatingRoute(pathname));
    dispatch(CleanigRecipeInfo());
    setTimeout(() => {
      dispatch(PageTransitionStop());
    }, 1000);
  }, []);
  useDocumentTitle(`Menu`);

  return (
    <>
      {pageTransition ? <PageLoading /> : null}
      <Menu />
    </>
  );
}

export default MenuPage;
