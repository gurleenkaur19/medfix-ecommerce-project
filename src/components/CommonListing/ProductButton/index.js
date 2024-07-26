"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context";
import { deleteProduct } from "@/services/product";
import ComponentLevelLoader from "@/components/Loader/componentLevelLoader";

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const contextValue = useContext(GlobalContext);
  const setCurrentUpdatedProduct = contextValue.setCurrentUpdatedProduct;
  const { setComponentLevelLoader, componentLevelLoader } =
    useContext(GlobalContext);
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
      router.refresh();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      setErrorMessage(res.message);
      console.log(res.message);
    }
  }

  const handleUpdateClick = (event, item) => {
    event.stopPropagation();
    setCurrentUpdatedProduct(item);
    router.push(`/admin-view/add-product`);
  };

  const handleAddToCartClick = (event) => {
    event.stopPropagation();
    // Add to cart logic
  };

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
        // onClick={(event) => handleAddToCartClick(event)}
        className="bg-emerald-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add To Cart
      </button>
    </>
  );
}
