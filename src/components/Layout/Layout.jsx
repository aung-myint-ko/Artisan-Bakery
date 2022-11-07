import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import PageLoading from "../../custom-hooks/PageLoading";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
  const location = useLocation();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1200);
  // }, [location]);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
