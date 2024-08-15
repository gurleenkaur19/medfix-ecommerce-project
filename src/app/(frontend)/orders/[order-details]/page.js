"use client";

import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function OrderDetails() {
  const { orderDetails, setOrderDetails, user } = useContext(GlobalContext);

  const params = useParams();
  const router = useRouter();

  async function extractOrderDetails() {
    const res = await getOrderDetails(params["order-details"]);
    if (res.success) {
      setOrderDetails(res.data);
    } else {
      console.error("Failed to fetch order details:", res);
    }
  }

  useEffect(() => {
    extractOrderDetails();
  }, []);

  return (
    <div className="py-14 px-4 md:px-6 mt-[90px]">
      <div className="flex justify-start items-start space-y-2 flex-col">
        <h1 className="text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-red-600">
          Order #{orderDetails && orderDetails._id}
        </h1>
        <p className="text-base font-medium leading-6 text-black">
          {orderDetails &&
            orderDetails.createdAt &&
            orderDetails.createdAt.split("T")[0]}{" "}
          |{" "}
          {orderDetails &&
            orderDetails.createdAt &&
            orderDetails.createdAt.split("T")[1].split(".")[0]}
        </p>
      </div>
      <div className="mt-10 flex flex-col justify-center xl:flex-row items-stretch w-full xl:space-x-8 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:p-6 xl:p-8 w-full">
            <p className="font-bold text-lg text-black">Your order summary</p>
            {orderDetails &&
            orderDetails.orderItems &&
            orderDetails.orderItems.length
              ? orderDetails.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                  >
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        src={item && item.product && item.product.imageUrl}
                        className="w-full hidden md:block"
                      />
                    </div>
                    <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                      <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-xl font-semibold leading-6 text-black">
                          {item && item.product && item.product.name}
                        </h3>
                      </div>
                      <div className="w-full flex justify-between items-start space-x-8">
                        <h3 className="text-xl font-semibold leading-6 text-black">
                          ${item && item.product && item.product.price}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-5 xl:space-x-8">
            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
              <h3 className="text-xl font-semibold leading-6 text-black">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                <div className="flex justify-between w-full">
                  <p className="text-base leading-5 text-black">Subtotal</p>
                  <p className="text-base leading-5 text-black">
                    ${orderDetails && orderDetails.totalPrice}
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-base leading-5 text-black">Shipping</p>
                  <p className="text-base leading-5 text-black">Free</p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-base leading-5 text-red-600">Subtotal</p>
                  <p className="text-base leading-5 text-red-600">
                    ${orderDetails && orderDetails.totalPrice}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-gray-50 w-full xl:w-96 flex items-center md:items-start px-4 py-6 flex-col">
            <h3 className="text-xl font-semibold leading-6 text-black">
              Customer Details
            </h3>
            <div className="flex flex-col justify-start items-start flex-shrink-0">
              <div className="flex gap-4 justify-center flex-col w-full md:justify-start py-8 border-b border-gray-200">
                <p className="text-base font-semibold leading-4 text-left text-black">
                  Name: {user?.name}
                </p>
                <p className="text-base font-semibold leading-4 text-left text-black">
                  Email: {user?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 md:space-y-0 xl:space-y-12 md:flex-row items-center md:items-start">
              <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                <p className="text-black">Shipping Address</p>
                <p className="text-black">
                  Address:{" "}
                  {orderDetails && orderDetails.shippingAddress.address}
                </p>
                <p className="text-black">
                  City: {orderDetails && orderDetails.shippingAddress.city}
                </p>
                <p className="text-black">
                  Country:{" "}
                  {orderDetails && orderDetails.shippingAddress.country}
                </p>
                <p className="text-black">
                  Postal Code:{" "}
                  {orderDetails && orderDetails.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push(`/`)}
            className="mt-5 mr-5 inline-block text-red-600 px-5 py-3 text-lg font-medium uppercase tracking-wide bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
          >
            Shop Again
          </button>
        </div>
      </div>
    </div>
  );
}
