"use client";
import React from "react";
import ProductTile from "./ProductTile";
import ProductButton from "./ProductButton";
const dummyData = [
  {
    _id: "6689b47a3da584f451af5ddd",
    name: "Set of Supplies",
    description: "A Whole Set",
    price: 200,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-34c3c.appspot.com/o/ecommerce%2Fmedical-supplies-PD.jpeg-1720300442075-w1kdr8axrn?alt=media&token=bb63f375-96c2-4303-86f2-02bb71781f29",
    category: "test-kit",

    deliveryInfo: "Free",
    onSale: "no",
    priceDrop: 0,
    createdAt: "2024-07-06",
    updatedAt: "2024-07-06",
    __v: 0,
  },
];

export default function CommonListing() {
  return (
    <>
      <section className="bg-white py-12 sm:py-16 ">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16 ">
            {dummyData && dummyData.length
              ? dummyData.map((item) => (
                  <article
                    key={item._id}
                    className="relative flex flex-col overflow-hidden border cursor-pointer  "
                  >
                    <ProductTile item={item} />
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
