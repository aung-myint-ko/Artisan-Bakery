import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Registration from "../../components/Order_Payment/Registration";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import PageLoading from "../../custom-hooks/PageLoading";
import {
  PageTransitionStart,
  PageTransitionStop,
} from "../../store/loadingSlice";

function OrderRegistrationPage(props) {
  useDocumentTitle("Order");
  const dispatch = useDispatch();
  const { pageTransition } = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    dispatch(PageTransitionStart());
    setTimeout(() => {
      dispatch(PageTransitionStop());
    }, 1000);
  }, []);
  return <>{pageTransition ? <PageLoading /> : <Registration />}</>;
}

export default OrderRegistrationPage;
