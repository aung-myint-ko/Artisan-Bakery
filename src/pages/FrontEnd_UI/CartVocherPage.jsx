import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartVocher from "../../components/Menu/CartVocher";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import PageLoading from "../../custom-hooks/PageLoading";
import {
  PageTransitionStart,
  PageTransitionStop,
} from "../../store/loadingSlice";

function CartVocherPage(props) {
  const dispatch = useDispatch();
  const { pageTransition } = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    dispatch(PageTransitionStart());
    setTimeout(() => {
      dispatch(PageTransitionStop());
    }, 1000);
  }, []);
  useDocumentTitle("Cart");
  return <>{pageTransition ? <PageLoading /> : <CartVocher />}</>;
}

export default CartVocherPage;
