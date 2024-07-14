"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "@/context";
import { deleteProduct } from "@/services/product";
import { useState } from "react";

export default function ProductButton({ item }) {
  const pathName = usePathname();

  const contextValue = useContext(GlobalContext);
  const setCurrentUpdatedProduct = contextValue.setCurrentUpdatedProduct;
  const { setComponentLevelLoader, componentLevelLoader } =
    useContext(GlobalContext);
  const isAdminView = pathName.includes("admin-view");
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDeleteProduct(item) {
    const res = await deleteProduct(item._id);
    if (res && res.success) {
      setComponentLevelLoader({ loading: true, id: item._id });
      setErrorMessage(res.message);
      router.refresh();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      setErrorMessage(res.message);
      console.log(res.message);
    }
  }

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push(`/admin-view/add-product`);
        }}
        className="flex w-full justify-center bg-amber-500  text-black font-semibold  
                py-2 px-4 border rounded px-5 py-3 text-base font-medium uppercase tracking-wide"
      >
        Update
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        className="mt-1.5 flex w-full justify-center bg-orange-600  text-black font-semibold  
                py-2 px-4 border rounded px-5 py-3 text-base uppercase tracking-wide "
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <componentLevelLoader
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
      <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
        Add To Cart
      </button>
    </>
  );
}
