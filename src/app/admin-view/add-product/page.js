"use client";

import { adminAddProductformControls } from "@/utils";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
function handleImage() {}

export default function AdminAddNewProduct() {
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

          {/* <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent
              data={AvailableSizes}
            />
          </div> */}
          {adminAddProductformControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComponent
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                key={controlItem.id}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComponent
                label={controlItem.label}
                options={controlItem.options}
                key={controlItem.id}
              />
            ) : null
          )}
          <button className="inline-flex w-full items-center justify-center bg-red-600 px-6 py-4 text-lg text-white font-medium uppercase tracking-wide">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
