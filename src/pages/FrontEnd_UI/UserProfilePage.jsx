import React, { useEffect } from "react";
import User from "../../components/User/User";
import UserNav from "../../components/User/UserNav";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";

function UserProfilePage({ setProgress }) {
  useDocumentTitle("User Profile");

  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  return (
    <>
      <UserNav />
      <User />
    </>
  );
}

export default UserProfilePage;
