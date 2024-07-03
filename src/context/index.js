"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
<<<<<<< HEAD
  const [commonLoader, setCommonLoader] = useState(false);
=======
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({loading:false, id:''});
>>>>>>> origin/Razieh
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
      setUser(false);
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
<<<<<<< HEAD
        commonLoader,
        setCommonLoader,
=======
        pageLevelLoader,
        setPageLevelLoader,
>>>>>>> origin/Razieh
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
<<<<<<< HEAD
=======
        componentLevelLoader, 
        setComponentLevelLoader
>>>>>>> origin/Razieh
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
