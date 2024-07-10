"use client";

import { GlobalContext } from "@/context";
import Notification from "@/components/Notification";
import { useContext } from "react";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import {
  AvailablePackaging,
  firebaseConfig,
  adminAddProductformControls,
  firebaseStorageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { ref } from "firebase/storage";
import { addNewProduct } from "@/services/product";
import { useRouter } from "next/navigation";
import ComponentLevelLoader from "@/components/Loader/componentLevelLoader";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL);

const createUniqueFileName = (getFile) => {
  const timestamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timestamp}-${randomStringValue}`;
};
async function helperForUploadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageRef = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}
const initialFormData = {
  name: "",
  price: 0,
  description: "",
  category: "beauty",
  packaging: [],
  deliveryInfo: "",
  imageUrl: "",
  onSale: "no",
  priceDrop: 0,
};

export default function AdminAddNewProduct() {
  const [formData, setFormData] = useState(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState();

  async function handleImage(event) {
    const extractImageURL = await helperForUploadingImageToFirebase(
      event.target.files[0]
    );

    if (extractImageURL !== "") {
      setFormData({
        ...formData,
        imageUrl: extractImageURL,
      });
    }
  }

  function handleTileClick(getCurrentItem) {
    let cpyPack = [...formData.packaging];
    const index = cpyPack.findIndex((item) => item.id === getCurrentItem.id);

    if (index === -1) {
      cpyPack.push(getCurrentItem);
    } else {
      cpyPack = cpyPack.filter((item) => item.id !== getCurrentItem.id);
    }

    setFormData({
      ...formData,
      packaging: cpyPack,
    });
  }

  async function handleAddProduct() {
    setErrorMessage(null);
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await addNewProduct(formData);
    console.log(res);

    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      setErrorMessage(res.message);

      setFormData(initialFormData);
      setTimeout(() => {
        router.push("/admin-view/all-products");
      }, 3000);
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      setErrorMessage(res.message);
      console.log(res.message);
    }
  }
  console.log(formData);

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8 text-black">
          <input
            accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
          />

          <div className="flex gap-2 flex-col">
            <label>Available Packaging</label>
            <TileComponent
              onClick={handleTileClick}
              data={AvailablePackaging}
              selected={formData.packaging}
            />
          </div>
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                key={controlItem.id}
                value={formData[controlItem.id]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: e.target.value,
                  });
                }}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                label={controlItem.label}
                options={controlItem.options}
                key={controlItem.id}
                value={formData[controlItem.id]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: e.target.value,
                  });
                }}
              />
            ) : null
          )}
          {errorMessage && (
            <div
              className="w-full bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{errorMessage}</span>
            </div>
          )}
          <button
            onClick={handleAddProduct}
            className="inline-flex w-full items-center justify-center bg-transparent hover:bg-red-500 text-red-600 hover:text-white border border-red-500 hover:border-transparent rounded px-6 py-4 text-lg  font-medium uppercase tracking-wide"
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text={"Adding Product..."}
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
