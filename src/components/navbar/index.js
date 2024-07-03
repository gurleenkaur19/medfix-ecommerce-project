"use client";
import React, { Fragment, useContext } from "react";
import { adminNavOptions, navOptions } from "../../utils/index";
import { GlobalContext } from "../../context/index";
import CommonModal from "../CommonModal";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const isAdminView = false;

function NavItems({ isModelView = false }) {
=======
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";


function NavItems({ isModelView = false , isAdminView , router}) {
>>>>>>> origin/Razieh
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto text-slate-950 ${
        isModelView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
          isModelView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((items) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={items.id}
<<<<<<< HEAD
=======
                onClick={() => router.push(items.path)}
>>>>>>> origin/Razieh
              >
                {items.label}
              </li>
            ))
          : navOptions.map((items) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                key={items.id}
<<<<<<< HEAD
=======
                onClick={() => router.push(items.path)}
>>>>>>> origin/Razieh
              >
                {items.label}
              </li>
            ))}
      </ul>
    </div>
  );
}

function NavBar() {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const { user, isAuthUser, setIsAuthUser, setUser } =
    useContext(GlobalContext);
<<<<<<< HEAD
=======

  const pathName = usePathname();
>>>>>>> origin/Razieh
  const router = useRouter();

  console.log(user, isAuthUser, "navbar");
  function handleLogout() {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token ");
    localStorage.clear();
    router.push("/");
  }
<<<<<<< HEAD
  let registrationRoute = "/register"; // Default route for clients and logged-out users
  if (user?.role === "admin") {
    registrationRoute = "/adminRegister"; // Admins get a different route
  }
=======

  const isAdminView = pathName.includes("admin-view");

>>>>>>> origin/Razieh

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
<<<<<<< HEAD
          <div className="flex items-center cursor-pointer">
=======
          <div onClick={() => router.push('/')} className="flex items-center cursor-pointer">
>>>>>>> origin/Razieh
            <img src="/logo.png" className="w-10 h-10" alt="logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-600 font-serif	">
              MedFix
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <Fragment>
                <button className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                  Account
                </button>
                <button className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                  Cart
                </button>
              </Fragment>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
<<<<<<< HEAD
                <button className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                  Client View
                </button>
              ) : (
                <button className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
=======
                <button  onClick={()=>{ router.push("/")}} className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                  Client View
                </button>
              ) : (
                <button onClick={() => { console.log('Navigating to admin view'); router.push("/admin-view")}} className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
>>>>>>> origin/Razieh
                  Admin View
                </button>
              )
            ) : null}
<<<<<<< HEAD

            {!isAuthUser || user?.role === "admin" ? (
              <button
                className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                onClick={() => router.push(registrationRoute)}
              >
                Register
              </button>
            ) : null}
            {/* Conditional rendering for showing the Login/Logout button */}
            {isAuthUser ? (
              <button
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded"
=======
            {isAuthUser ? (
              <button
                className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
>>>>>>> origin/Razieh
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
<<<<<<< HEAD
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded"
=======
                className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
>>>>>>> origin/Razieh
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
<<<<<<< HEAD
          <NavItems />
=======
          <NavItems router={router} isAdminView={isAdminView}/>
>>>>>>> origin/Razieh
        </div>
      </nav>
      <CommonModal
        showModalTitle={false}
<<<<<<< HEAD
        mainContent={<NavItems isModelView={true} />}
=======
        mainContent={<NavItems router={router} isModelView={true} isAdminView={isAdminView}/>}
>>>>>>> origin/Razieh
        show={showNavModal}
        setShow={setShowNavModal}
      />
    </>
  );
}

export default NavBar;
