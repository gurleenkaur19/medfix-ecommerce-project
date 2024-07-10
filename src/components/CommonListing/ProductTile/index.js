"use client";

import React from "react";

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

export default function ProductTile({ item }) {
  return (
    <div>
      <div className="relative">
        <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52">
          <img
            src={item.imageUrl}
            alt={`${item.name} - ${item.description}`}
            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
          />
        </div>
        {item.onSale === "yes" && (
          <div className="absolute top-0 left-0 m-2 rounded-full bg-red-600">
            <p className="rounded-full p-1 text-[15px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
              Sale
            </p>
          </div>
        )}
        <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
          <div className="mb-2 h-24">
            {" "}
            {/* Adjust this height as needed */}
            <h3 className="text-black font-semibold not-italic text-2xl">
              {truncateText(item.name, 3)}
            </h3>
            <h3 className="text-gray-400 text-base">
              {truncateText(item.description, 10)}
            </h3>
          </div>
          <div className="mt-8 flex">
            <p className="text-sm text-black font-semibold">{`$${item.price}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
