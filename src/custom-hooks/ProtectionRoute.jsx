import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function ProtectionRouteForAdmin({ redirectPath, children }) {
  const loggedInAdmin = sessionStorage.getItem("admin");

  if (!loggedInAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}

export const ProtectionRouteForOrderRegistration = ({
  redirectPath,
  children,
}) => {
  let { orderLists } = useSelector((state) => state.cartReducer);

  if (orderLists.length === 0) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export const ProtectionRouteForUser = ({ children }) => {
  const loggedInUser = sessionStorage.getItem("user");
  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};
