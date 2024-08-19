"use client";
import React from "react";
import ProductTile from "./ProductTile";
import ProductButton from "./ProductButton";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CommonListing({ data }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleArticleClick = (item) => {
    router.push(`/product/${item._id}`);
  };

  return (
    <>
      <section className="bg-white mt-[40px]">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mb-6">
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
            {data && data.length
              ? data.map((item) => (
                  <article
                    key={item._id}
                    className="relative flex flex-col overflow-hidden border cursor-pointer"
                  >
                    <ProductTile
                      item={item}
                      onClick={() => handleArticleClick(item)}
                    />
                    <ProductButton item={item} />
                  </article>
                ))
              : null}
          </div>
        </div>
      </section>
    </>
  );
}
