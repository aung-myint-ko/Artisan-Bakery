import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Banner from "../../components/Home/Banner";
import BriefIntro from "../../components/Home/BriefIntro";
import Process from "../../components/Home/Process";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import { UpdatingRoute } from "../../store/cartSlice";

function Home({ setProgress }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useDocumentTitle("Home");

  useEffect(() => {
    setProgress(50);
    dispatch(UpdatingRoute(pathname));
    setProgress(100);
  }, [dispatch, pathname, setProgress]);

  return (
    <div>
      <Banner />
      <BriefIntro />
      <Process />
    </div>
  );
}

export default Home;
