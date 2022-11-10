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

  useDocumentTitle("Home");

  useEffect(() => {
    dispatch(PageTransitionStart());
    dispatch(UpdatingRoute(pathname));
    setTimeout(() => {
      dispatch(PageTransitionStop());
    }, 3000);
  }, []);

  return (
    <div>
      {pageTransition ? <PageLoading /> : null}

      <Banner />
      <BriefIntro />
      <Process />
    </div>
  );
}

export default Home;
