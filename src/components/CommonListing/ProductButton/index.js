"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "@/context";

export default function ProductButton({ item }) {
  const pathName = usePathname();

  const contextValue = useContext(GlobalContext);
  const setCurrentUpdatedProduct = contextValue.setCurrentUpdatedProduct;
  const isAdminView = pathName.includes("admin-view");
  const router = useRouter();

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
        className="mt-1.5 flex w-full justify-center bg-orange-600  text-black font-semibold  
                py-2 px-4 border rounded px-5 py-3 text-base uppercase tracking-wide "
      >
        Delete
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
