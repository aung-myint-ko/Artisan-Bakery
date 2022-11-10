import React from "react";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import UserHistory from "../../components/User/UserHistory";
import UserNav from "../../components/User/UserNav";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PageTransitionStart,
  PageTransitionStop,
} from "../../store/loadingSlice";
import PageLoading from "../../custom-hooks/PageLoading";

function UserHistoryPage(props) {
  useDocumentTitle("User History");
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
      {pageTransition ? <PageLoading /> : null}
      <UserNav />
      <UserHistory />
    </>
  );
}

export default UserHistoryPage;
