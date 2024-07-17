"use client";

import React, { useContext } from "react";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const { replace } = useRouter();
  const context = useContext(GlobalContext);

  const isAuthUser = context.isAuthUser;
  const user = context.user;
  if (isAuthUser == false) {
    replace("/register");
  }
  if (isAuthUser == true && user.role != "admin") {
    replace("/login");
  }

  return <>{children}</>;
}
