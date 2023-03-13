import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Shop from "../../components/Shop/Shop";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import PageLoading from "../../custom-hooks/PageLoading";
import { UpdatingRoute } from "../../store/cartSlice";

function ShopPage({ setProgress }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { pageTransition } = useSelector((state) => state.loadingReducer);

  useEffect(() => {
    setProgress(50);
    dispatch(UpdatingRoute(pathname));
    setProgress(100);
  }, [dispatch, pathname, setProgress]);
  useDocumentTitle("Shop");

  return (
    <>
      {pageTransition ? <PageLoading /> : null}
      <Shop />
    </>
  );
}

export default ShopPage;
