import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import Story from "../../components/About/Story";
import { UpdatingRoute } from "../../store/cartSlice";
import {
  PageTransitionStart,
  PageTransitionStop,
} from "../../store/loadingSlice";
import PageLoading from "../../custom-hooks/PageLoading";

function AboutUs(props) {
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
  useDocumentTitle("About Us");
  return <>{pageTransition ? <PageLoading /> : <Story />}</>;
}

export default AboutUs;
