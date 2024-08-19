"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import ComponentLevelLoader from "@/components/Loader/componentLevelLoader";
import { GlobalContext } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function Account() {
  const {
    user,
    addresses,
    setAddresses,
    addressFormData,
    setAddressFormData,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
  const router = useRouter();

  async function extractAllAddresses() {
    const res = await fetchAllAddresses(user?._id);

    if (res.success) {
      setAddresses(res.data);
    }
  }

  async function handleAddOrUpdateAddress() {
    setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentEditedAddressId !== null
        ? await updateAddress({
            ...addressFormData,
            _id: currentEditedAddressId,
          })
        : await addNewAddress({ ...addressFormData, userID: user?._id });

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success("Address added successfully");

      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
      extractAllAddresses();
      setCurrentEditedAddressId(null);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error("Failed to add address");

      setAddressFormData({
        fullName: "",
        city: "",
        country: "",
        postalCode: "",
        address: "",
      });
    }
  }

  function handleUpdateAddress(getCurrentAddress) {
    setShowAddressForm(true);
    setAddressFormData({
      fullName: getCurrentAddress.fullName,
      city: getCurrentAddress.city,
      country: getCurrentAddress.country,
      postalCode: getCurrentAddress.postalCode,
      address: getCurrentAddress.address,
    });
    setCurrentEditedAddressId(getCurrentAddress._id);
  }

  async function handleDelete(getCurrentAddressID) {
    setComponentLevelLoader({ loading: true, id: getCurrentAddressID });

    const res = await deleteAddress(getCurrentAddressID);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success("Address deleted successfully");

      extractAllAddresses();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });

      toast.error("Failed to delete address");
    }
  }

  useEffect(() => {
    if (user !== null) extractAllAddresses();
  }, [user]);

  return (
    <section>
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <h1 className="mt-20 font-bold text-3xl text-red-600">
              My Account
            </h1>
            <div className="mt-5 flex flex-col flex-1 text-black">
              <h4 className="text-lg font-semibold md:text-left">
                {user?.name}
              </h4>
              <p>{user?.email}</p>
              {user?.role === "admin" && <p>{user?.role}</p>}
            </div>
            <button
              onClick={() => router.push("/orders")}
              className="mt-5 inline-block bg-black px-5 py-3 text-md font-medium uppercase tracking-wide bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
              View Your Orders
            </button>
            <div className="mt-6">
              <h1 className="font-bold text-lg text-black">Your Addresses :</h1>
              <div className="mt-4 flex flex-col gap-4 text-black">
                {addresses && addresses.length ? (
                  addresses.map((item) => (
                    <div className="border p-6 text-black" key={item._id}>
                      <p>Name : {item.fullName}</p>
                      <p>Address : {item.address}</p>
                      <p>City : {item.city}</p>
                      <p>Country : {item.country}</p>
                      <p>PostalCode : {item.postalCode}</p>
                      <button
                        onClick={() => handleUpdateAddress(item)}
                        className="mt-5 inline-block bg-black px-5 py-3 text-md font-medium uppercase tracking-wide bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="mt-5 ml-5 inline-block bg-black px-5 py-3 text-md font-medium uppercase tracking-wide bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                      >
                        {componentLevelLoader &&
                        componentLevelLoader.loading &&
                        componentLevelLoader.id === item._id ? (
                          <ComponentLevelLoader
                            text={"Deleting..."}
                            color={"#ffffff"}
                            loading={
                              componentLevelLoader &&
                              componentLevelLoader.loading
                            }
                          />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No address found! Please add a new address below</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="mt-5 inline-block bg-black px-5 py-3 text-md font-medium uppercase tracking-wide bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              >
                {showAddressForm ? "Hide Address Form" : "Add New Address"}
              </button>
            </div>
            {showAddressForm ? (
              <div className="flex flex-col mt-5 justify-center pt-4 items-center text-black">
                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                  {addNewAddressFormControls.map((controlItem) => (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      key={controlItem.id}
                      value={addressFormData[controlItem.id]}
                      onChange={(event) =>
                        setAddressFormData({
                          ...addressFormData,
                          [controlItem.id]: event.target.value,
                        })
                      }
                    />
                  ))}
                </div>
                <button
                  onClick={handleAddOrUpdateAddress}
                  className="mt-5 inline-block bg-black px-5 py-3 text-md font-medium uppercase tracking-wide bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Saving..."}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
