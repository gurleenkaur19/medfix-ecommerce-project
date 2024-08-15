"use client";
import ComponentLevelLoader from "@/components/Loader/componentLevelLoader";
import { useContext } from "react";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { useRouter } from "next/navigation";

export default function CommonDetails({ item }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModel,
  } = useContext(GlobalContext);
  const router = useRouter();

  if (!item) {
    return (
      <div className="mt-[80px] text-red-700">No product details available</div>
    );
  }

  async function handleAddToCart(getItem) {
    if (!user || (user.role !== "customer" && user.role !== "admin")) {
      router.push("/login");
      return;
    }

    if (!getItem || !getItem._id) {
      console.error("Invalid item data");
      setComponentLevelLoader({ loading: false, id: "" });
      return;
    }

    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModel(true);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModel(true);
    }
  }

  return (
    <section className="mx-auto mt-[80px] max-w-screen-xl px-4 sm:px-6 lg:px-8 color-black">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1 lg:sticky lg:top-20 h-[calc(100vh-80px)]">
            <div className="lg:flex lg:items-start h-full">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    className="h-full w-full max-w-full object-cover"
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2 overflow-y-auto">
            <div className="overflow-y-auto h-full">
              <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
              <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end flex-wrap">
                  <h1
                    className={`text-3xl font-bold text-black mr-2 ${
                      item.onSale === "yes" ? "line-through" : ""
                    }`}
                  >
                    ${item && item.price}
                  </h1>
                  {item.onSale === "yes" ? (
                    <>
                      <h1 className="mr-3 text-sm font-semibold text-red-700">{`$ ${(
                        item.price -
                        item.price * (item.priceDrop / 100)
                      ).toFixed(2)}`}</h1>
                      <span className="mr-3 text-sm font-semibold text-black">
                        {`-(${item.priceDrop}%) off`}
                      </span>
                    </>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="mt-1.5 inline-block bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Adding to Cart..."}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
              <ul className="mt-8 space-y-2">
                <li className="flex items-center font-bold text-left text-sm font-medium text-gray-600">
                  {item.deliveryInfo}
                </li>
                <li className="flex items-center text-left text-sm font-medium text-gray-600">
                  {"Cancel anytime"}
                </li>
              </ul>
              <div className="lg:col-span-3">
                <div className="border-b border-gray-400">
                  <nav className="flex gap-4">
                    <a
                      href="#"
                      className="border-b-2 border-gray-900 mt-4 text-lg font-medium text-gray-900"
                    >
                      Description
                    </a>
                  </nav>
                </div>
                <div className="flow-root mt-8 sm:mt-4 text-black">
                  {item.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
