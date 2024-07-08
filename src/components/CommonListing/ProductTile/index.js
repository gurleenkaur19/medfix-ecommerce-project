"use client";

export default function ProductTile({ item }) {
  return (
    <div className="relative pt-0">
      <div className="overflow-hidden aspect-w-1 aspect-h-1 h-52 ">
        <img
          src={item.imageUrl}
          alt={`${item.name} - ${item.description}`}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125 "
        />
      </div>
      {item.onSale === "yes" && (
        <div className="absolute top-0 left-0 m-2 rounded-full bg-black">
          <p className="rounded-full p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      )}
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <h3 className="mb-2 text-black font-semibold not-italic text-2xl">
          {item.name}
        </h3>
        <h3 className="mb-2 text-gray-400 text-base">{item.description}</h3>
        <div className="mb-2 flex">
          <p className="text-sm text-black font-semibold">{`$${item.price}`}</p>
        </div>
      </div>
    </div>
  );
}
