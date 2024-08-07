"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { useContext, useEffect } from "react";

export default function Cart() {
  const {
    user,
    setCartItems,
    cartItems,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    if (res && res.success) {
      setCartItems(res.data);
      localStorage.setItem("cartItems", JSON.stringify(res.data));
    }

    console.log(res);
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });

      extractAllCartItems();
    } else {
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  }

  // if (pageLevelLoader) {
  //   return (
  //     <div className="w-full min-h-screen flex justify-center items-center">
  //       <PulseLoader
  //         color={"#000000"}
  //         loading={pageLevelLoader}
  //         size={50}
  //         data-testid="loader"
  //       />
  //     </div>
  //   );
  // }

  return (
    <CommonCart
      componentLevelLoader={componentLevelLoader}
      handleDeleteCartItem={handleDeleteCartItem}
      cartItems={cartItems}
    />
  );
}
