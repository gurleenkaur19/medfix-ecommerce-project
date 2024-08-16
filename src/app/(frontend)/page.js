"use client";
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { getAllAdminProducts } from "@/services/product";

export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const timer = new Promise((resolve) => setTimeout(resolve, 3000));
    timer.then(() => setLoading(false));
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      const res = await getAllAdminProducts();
      if (res.success) {
        setProducts(res.data);
      }
    }

    if (!loading) {
      fetchProducts();
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-red-500 ">
        <section className="">
          <div className="grid max-w-screen-xl px-4 py-8 mx-suto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl">
                High Quality Medical Equipment For Your Facility
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
                There For You When You Need
              </p>

              <button
                type="button"
                onClick={() => router.push("/product/listing/all-products")}
                className="mt-1 inline-block bg-red-600 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
              >
                Explore Medical Supplies
              </button>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img
                src="https://media.istockphoto.com/id/1373659740/photo/shot-of-a-young-doctor-sharing-information-from-his-digital-tablet-with-an-older-patient.jpg?s=612x612&w=0&k=20&c=xi-5BceyNKDF919oSK3GheekuIGTJ5Jl3ccWopz47LE="
                alt="Explore Medical Supplies"
              />
            </div>
          </div>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
              <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                <div className="max-w-md mx-auto text-center lg:text-left">
                  <div>
                    <h2 className="text-xl font-bold text-red-600 sm:text-3xl">
                      Essential Medical Supplies
                    </h2>
                  </div>
                  <button
                    onClick={() => router.push("/product/listing/all-products")}
                    className="mt-[20px] inline-block bg-red-600 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop ALL
                  </button>
                </div>
              </div>
              <div className="lg:col-span-2 lg:py-8">
                <ul className="grid grid-cols-2 gap-4">
                  {products && products.length
                    ? products
                        .filter((item) => item.onSale === "yes")
                        .splice(0, 2)
                        .map((productItem) => (
                          <li
                            onClick={() =>
                              router.push(`/product/${productItem._id}`)
                            }
                            className="cursor-pointer"
                            key={productItem._id}
                          >
                            <div>
                              <img
                                src={productItem.imageUrl}
                                alt="Sale Product Item"
                                className="object-cover w-full rounded aspect-square"
                              />
                            </div>
                            <div className="mt-3">
                              <h3 className="font-medium text-gray-900">
                                {productItem.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-800">
                                ${productItem.price}{" "}
                                <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                              </p>
                            </div>
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
            <div className="text-center">
              <h2 className="text-xl font-bold text-red-600 sm:text-3xl">
                SHOP BY CATEGORY
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
              <li>
                <div className="relative block group">
                  <img
                    src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRAoZSQNIyD0RJCifb95MgdRJJUg6-dM85DeLWIuaw9aDAlh1w5j2Bipu1GQlkn3a_W_C1xDRxg6oJArJOR1-J4zQrRJ5o_Gr84Ia7UfYqfZAw-ZrAhXJnsNPQoyY6x2VSORyxXhw&usqp=CAc"
                    className="object-cover w-full aspect-square"
                    alt="Surgical Supplies"
                  />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-gray-900">Kits</h3>
                    <button
                      onClick={() => router.push("/product/listing/test-kit")}
                      className="mt-1.5 inline-block bg-red-600 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative block group">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcoeNqMykSK1DEALmnt7STB5nNFbQeKN67yQ&s"
                    className="object-cover w-full aspect-square"
                    alt="baby-care"
                  />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-black">
                      Baby Care
                    </h3>
                    <button
                      onClick={() => router.push("/product/listing/baby-care")}
                      className="mt-1.5 inline-block bg-red-600 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </li>
              <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <div className="relative block group">
                  <img
                    src="data:image/jpeg;base64,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"
                    className="object-cover w-full aspect-square"
                    alt="beauty"
                  />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <h3 className="text-xl font-medium text-black">Beauty</h3>
                    <button
                      onClick={() => router.push("/product/listing/beauty")}
                      className="mt-1.5 inline-block bg-red-600 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
