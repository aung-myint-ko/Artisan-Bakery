import React, { useEffect } from "react";
import Registration from "../../components/Order_Payment/Registration";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";

function OrderRegistrationPage({ setProgress }) {
  useDocumentTitle("Order");
  useEffect(() => {
    setProgress(100);
  }, [setProgress]);
  return (
    <>
      <Registration />
    </>
  );
}

export default OrderRegistrationPage;
