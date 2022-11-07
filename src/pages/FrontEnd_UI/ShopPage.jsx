import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Shop from "../../components/Shop/Shop";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import PageLoading from "../../custom-hooks/PageLoading";
import { UpdatingRoute } from "../../store/cartSlice";
import {
  PageTransitionStart,
  PageTransitionStop,
} from "../../store/loadingSlice";

function ShopPage(props) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { pageTransition } = useSelector((state) => state.loadingReducer);

  useEffect(() => {
    dispatch(PageTransitionStart());
    dispatch(UpdatingRoute(pathname));
    setTimeout(() => {
      dispatch(PageTransitionStop());
    }, 1000);
  }, []);
  useDocumentTitle("Shop");

  return <>{pageTransition ? <PageLoading /> : <Shop />}</>;
}

export default ShopPage;
