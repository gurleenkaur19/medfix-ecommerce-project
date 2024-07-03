// Updated Register component without SelectComponent

"use client";

import { registrationFormControls } from "@/utils";
import InputComponent from "../../components/FormElements/InputComponent";
import { useState } from "react";
import { registerNewUser } from "../../services/register/index";
import { useRouter } from "next/navigation"; // Corrected import

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer", // This field will not be changeable by the user in the UI anymore
};

export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  const [isRegistered, setIsRegistered] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setemailError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  function isFormValid() {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleRegisterOnSubmit() {
    setErrorMessage(null);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let errors = false;
    setPasswordError("");
    setemailError("");

    if (formData.password.length < 6) {
      setPasswordError("Password must be 6 letters or more");
      errors = true;
    }
    if (!emailRegex.test(formData.email)) {
      setemailError("Invalid email address");
      errors = true;
    }

    if (errors) {
      return;
    }

    try {
      const data = await registerNewUser(formData);
      if (data.success) {
        setIsRegistered(true);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <div className="bg-white relative text-gray-900 h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row ">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <div className="flex items-center cursor-pointer pb-2">
                <img src="/logo.png" className="w-10 h-10" alt="logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-600 font-serif">
                  MedFix
                </span>
              </div>
              <p className="w-full text-4xl font-medium text-center font-serif">
                {isRegistered
                  ? "Registration Successful!"
                  : "Sign up for an account"}
              </p>
              <div className="font-semibold mt-2 text-lg">
                {errorMessage && (
                  <div
                    className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <span className="block sm:inline">{errorMessage}</span>
                  </div>
                )}
              </div>
              {isRegistered ? (
                <button
                  className="inline-flex w-full items-center justify-center px-6 py-4 text-lg transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {registrationFormControls.map(
                    (controlItem) =>
                      controlItem.componentType === "input" ? (
                        <div key={controlItem.id}>
                          <InputComponent
                            type={controlItem.type}
                            placeholder={controlItem.placeholder}
                            label={controlItem.label}
                            key={controlItem.id}
                            onChange={(event) => {
                              setFormData({
                                ...formData,
                                [controlItem.id]: event.target.value,
                              });
                            }}
                            value={formData[controlItem.id]}
                          />
                          {controlItem.id === "password" && passwordError ? (
                            <span className="text-red-500 text-sm">
                              {passwordError}
                            </span>
                          ) : null}
                          {controlItem.id === "email" && emailError ? (
                            <span className="text-red-500 text-sm">
                              {emailError}
                            </span>
                          ) : null}
                        </div>
                      ) : null // Removed SelectComponent related code
                  )}
                  <button
                    className=" disabled:opacity-50 inline-flex w-full items-center justify-center  px-6 py-4 text-lg
                  transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                  bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white 
                  py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    disabled={!isFormValid()}
                    onClick={handleRegisterOnSubmit}
                  >
                    Register
                  </button>
                </div>
              )}
              <div className="">
                Already Registered??{" "}
                <span
                  className="text-red-500 cursor-pointer font-semibold "
                  onClick={() => router.push("/login")}
                >
                  Login
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
