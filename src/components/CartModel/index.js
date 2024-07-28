"use client";

import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { Button } from "@headlessui/react";

export default function CartModal() {
  const { showCartModel, setShowCartModel } = useContext(GlobalContext);

  return (
    <CommonModal
      showButtons={true}
      show={showCartModel}
      setShow={setShowCartModel}
      buttonComponent={
        <Fragment>
          <Button>Go to Cart</Button>
          <Button>Checkout</Button>
        </Fragment>
      }
    />
  );
}
