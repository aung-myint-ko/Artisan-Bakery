import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Banner from "../../components/Home/Banner";
import BriefIntro from "../../components/Home/BriefIntro";
import Process from "../../components/Home/Process";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import PageLoading from "../../custom-hooks/PageLoading";
import { UpdatingRoute } from "../../store/cartSlice";
import {
  PageTransitionStart,
  PageTransitionStop,
} from "../../store/loadingSlice";

function Home(props) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { pageTransition } = useSelector((state) => state.loadingReducer);
  const loggedInUser = sessionStorage.getItem("user");

  useDocumentTitle("Home");

  useEffect(() => {
    dispatch(PageTransitionStart());
    dispatch(UpdatingRoute(pathname));
    setTimeout(() => {
      dispatch(PageTransitionStop());
    }, 1000);
  }, []);

  return (
    <>
      {pageTransition ? (
        <PageLoading />
      ) : (
        <>
          <Banner />
          <BriefIntro />
          <Process />
        </>
      )}
    </>
  );
}

export default Home;
