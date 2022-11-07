import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import AllMenu from "../../components/Menu/AllMenu";
import { UpdatingRoute } from "../../store/cartSlice";
import { CleanigRecipeInfo } from "../../store/recipeSlice";
import {
  PageTransitionStart,
  PageTransitionStop,
} from "../../store/loadingSlice";
import PageLoading from "../../custom-hooks/PageLoading";

function AllMenuPage(props) {
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

  useDocumentTitle("All Menu");
  return <>{pageTransition ? <PageLoading /> : <AllMenu />}</>;
}

export default AllMenuPage;
