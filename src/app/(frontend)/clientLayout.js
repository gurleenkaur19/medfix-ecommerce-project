"use client";
import { usePathname } from "next/navigation";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/adminRegister";

  return (
    <>
      {!isAuthPage && <NavBar />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  );
}
