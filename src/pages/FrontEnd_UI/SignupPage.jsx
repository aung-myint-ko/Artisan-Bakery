import React from "react";
import UserSignUp from "../../components/Auth/UserSingUp";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";

function SignupPage(props) {
  useDocumentTitle("SignUp");
  return (
    <>
      <UserSignUp />
    </>
  );
}

export default SignupPage;
