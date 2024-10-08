"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { Button } from "@headlessui/react";
import { getAllCartItems, deleteFromCart } from "@/services/cart";
import ComponentLevelLoader from "@/components/Loader/componentLevelLoader";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CartModal() {
  const {
    showCartModel,
    setShowCartModel,
    user,
    cartItems,
    setCartItems,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();

  async function extractAllCartItems() {
    const res = await getAllCartItems(user?._id);

    if (res && res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
              ...item,
              productID: {
                ...item.productID,
                price:
                  item.productID.onSale === "yes"
                    ? parseInt(
                        (
                          item.productID.price -
                          item.productID.price *
                            (item.productID.priceDrop / 100)
                        ).toFixed(2)
                      )
                    : item.productID.price,
              },
            }))
          : [];
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success("Item removed from cart successfully!");

      extractAllCartItems();
    } else {
      toast.error("Failed to remove item from cart!");
      setComponentLevelLoader({ loading: false, id: getCartItemID });
    }
  }

  return (
    <CommonModal
      showButtons={true}
      show={showCartModel}
      setShow={setShowCartModel}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem) => (
              <li key={cartItem._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      cartItem &&
                      cartItem.productID &&
                      cartItem.productID.imageUrl
                    }
                    alt="Cart Item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>
                          {cartItem &&
                            cartItem.productID &&
                            cartItem.productID.name}
                        </a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      $
                      {cartItem &&
                        cartItem.productID &&
                        cartItem.productID.price}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-yellow-600 sm:order-2"
                      onClick={() => handleDeleteCartItem(cartItem._id)}
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === cartItem._id ? (
                        <ComponentLevelLoader
                          text={"Removing..."}
                          color={"#000000"}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">Your cart is empty.</div>
        )
      }
      buttonComponent={
        <Fragment>
          <Button
            type="button"
            onClick={() => {
              router.push("/cart");
              setShowCartModel(false);
            }}
            className="mt-1.5 w-full inline-block px-5 py-3 text-sm font-medium uppercase tracking-wide bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Go to Cart
          </Button>
          <Button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            onClick={() => {
              router.push("/checkout");
              setShowCartModel(false);
            }}
            className="mt-1.5 w-full inline-block px-5 py-3 text-sm font-medium uppercase tracking-wide bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Checkout
          </Button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button
              type="button"
              onClick={() => {
                router.push("/");
                setShowCartModel(false);
              }}
              className="font-medium bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
