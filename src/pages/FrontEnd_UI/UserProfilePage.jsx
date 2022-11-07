import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../components/User/User";
import UserNav from "../../components/User/UserNav";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import PageLoading from "../../custom-hooks/PageLoading";
import {
  PageTransitionStart,
  PageTransitionStop,
} from "../../store/loadingSlice";

function UserProfilePage(props) {
  useDocumentTitle("User Profile");
  const dispatch = useDispatch();
  const { pageTransition } = useSelector((state) => state.loadingReducer);

  useEffect(() => {
    dispatch(PageTransitionStart());
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
          <UserNav />
          <User />
        </>
      )}
    </>
  );
}

export default UserProfilePage;
