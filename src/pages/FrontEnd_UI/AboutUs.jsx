import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import Story from "../../components/About/Story";
import { UpdatingRoute } from "../../store/cartSlice";

function AboutUs({ setProgress }) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    setProgress(50);
    dispatch(UpdatingRoute(pathname));
    setProgress(100);
  }, [dispatch, pathname, setProgress]);
  useDocumentTitle("About Us");
  return (
    <>
      <Story />
    </>
  );
}

export default AboutUs;
