"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import { loginFormControls } from "@/utils";
import { login } from "../../../services/login/index";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
import ComponentLevelLoader from "@/components/Loader/componentLevelLoader";

const initialFormdata = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialFormdata);
  const [errorMessage, setErrorMessage] = useState();
  const context = useContext(GlobalContext);

  const isAuthUser = context.isAuthUser;
  const setIsAuthUser = context.setIsAuthUser;
  const user = context.user;
  const setUser = context.setUser;
  const componentLevelLoader = context.componentLevelLoader;
  const setComponentLevelLoader = context.setComponentLevelLoader;

  const router = useRouter();
  console.log(formData);
  function isValidForm() {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  }

  async function handleLogin() {
    setErrorMessage(null);
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await login(formData);
    console.log(res);

    if (res.success) {
      setIsAuthUser(true);
      setUser(res?.finalData?.user);
      setFormData(initialFormdata);
      Cookies.set("token", res?.finalData?.token);
      localStorage.setItem("token", res?.finalData?.token);
      localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      console.log(res.message);
      setIsAuthUser(false);
      setUser(null);
      Cookies.set("token", "");
      localStorage.clear();
      setErrorMessage(res.message);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }
  console.log(isAuthUser, user);
  useEffect(() => {
    console.log("Effect triggered. isAuthUser:", isAuthUser);
    if (isAuthUser) {
      router.push("/");
    }
  }, [isAuthUser, router]);

  return (
    <div className="bg-white relative text-gray-900">
      <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row ">
        <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
              <div className="flex items-center cursor-pointer pb-2">
                <img src="/logo.png" className="w-10 h-10" alt="logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-600 font-serif	">
                  MedFix
                </span>
              </div>
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>
              {errorMessage && (
                <div
                  className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <span className="block sm:inline">{errorMessage}</span>
                </div>
              )}

              <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      key={controlItem.id}
                      value={formData[controlItem.id]}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          [controlItem.id]: event.target.value,
                        })
                      }
                    />
                  ) : null
                )}
                <button
                  className="disabled:opacity-50 inline-flex w-full items-center justify-center  px-6 py-4 text-lg
                transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white 
                py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  disabled={!isValidForm()}
                  onClick={handleLogin}
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Logging in..."}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex flex-col gap-2">
                  <p>
                    New to <b className="text-red-600 font-serif">MedFix</b> ?
                  </p>
                  <button
                    className="inline-flex w-full items-center justify-center  px-6 py-4 text-lg 
                transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white 
                py-2 px-4 border border-red-500 hover:border-transparent rounded"
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
