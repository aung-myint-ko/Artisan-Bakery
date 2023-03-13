import React, { useEffect } from "react";
import CartVocher from "../../components/Menu/CartVocher";
import useDocumentTitle from "../../custom-hooks/ChangePageTitle";

function CartVocherPage({ setProgress }) {
  useEffect(() => {
    setProgress(100);
  }, [setProgress]);
  useDocumentTitle("Cart");
  return (
    <>
      <CartVocher />
    </>
  );
}

export default CartVocherPage;
