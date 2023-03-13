import React from "react";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";
import UserHistory from "../../components/User/UserHistory";
import UserNav from "../../components/User/UserNav";
import { useEffect } from "react";

function UserHistoryPage({ setProgress }) {
  useDocumentTitle("User History");

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  return (
    <>
      <UserNav />
      <UserHistory />
    </>
  );
}

export default UserHistoryPage;
