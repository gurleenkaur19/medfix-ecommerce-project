"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context";
import { deleteProduct } from "@/services/product";
import { addToCart } from "@/services/cart";
import ComponentLevelLoader from "@/components/Loader/componentLevelLoader";
import toast from "react-hot-toast";

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const contextValue = useContext(GlobalContext);
  const setCurrentUpdatedProduct = contextValue.setCurrentUpdatedProduct;
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    showCartModel,
    setShowCartModel,
    user,
  } = useContext(GlobalContext);
  const isAdminView = pathName.includes("admin-view");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDeleteProduct(event, item) {
    event.stopPropagation();

    setComponentLevelLoader({ loading: true, id: item._id });

    const res = await deleteProduct(item._id);

    if (res && res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      setErrorMessage(res.message);

      toast.success("Product deleted successfully");

      router.refresh("/admin-view/all-products");
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      setErrorMessage(res.message);
      // console.log(res.message);
    }
  }

  const handleUpdateClick = (event, item) => {
    event.stopPropagation();
    setCurrentUpdatedProduct(item);
    router.push(`/admin-view/add-product`);
  };

  async function handleAddToCart(getItem) {
    try {
      setComponentLevelLoader({ loading: true, id: getItem._id });

      const res = await addToCart({ productID: getItem._id, userID: user._id });

      if (res && res.success) {
        toast.success("Added to cart successfully");
        setComponentLevelLoader({ loading: false, id: "" });
        setShowCartModel(true);
      } else {
        toast.error("Failed to add to cart");
        setComponentLevelLoader({ loading: false, id: "" });
        setShowCartModel(true);
        console.error("Failed to add to cart:", res);
      }
    } catch (error) {
      setComponentLevelLoader({ loading: false, id: "" });
      console.error("Error adding to cart:", error);
    }
  }

  return isAdminView ? (
    <>
      <button
        onClick={(event) => handleUpdateClick(event, item)}
        className="flex w-full justify-center bg-amber-500 text-black font-semibold py-2 px-4 border rounded px-5 py-3 text-base font-medium uppercase tracking-wide"
      >
        Update
      </button>
      <button
        onClick={(event) => handleDeleteProduct(event, item)}
        className="mt-1.5 flex w-full justify-center bg-orange-600 text-black font-semibold py-2 px-4 border rounded px-5 py-3 text-base uppercase tracking-wide"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Deleting Product..."}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "DELETE"
        )}
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleAddToCart(item)}
        className="bg-emerald-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={"Adding to cart"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Add To Cart"
        )}
      </button>
    </>
  );
}
