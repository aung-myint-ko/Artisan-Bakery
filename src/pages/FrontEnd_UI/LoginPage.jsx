import React from "react";
import UserLogIn from "../../components/Auth/UserLogIn";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";

function LoginPage(props) {
  useDocumentTitle("LogIn");
  return (
    <>
      <UserLogIn />
    </>
  );
}

export default LoginPage;
