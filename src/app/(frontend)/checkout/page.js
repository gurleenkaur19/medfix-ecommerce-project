"use client";
import { useContext } from "react";
import { GlobalContext } from "@/context";

export default function Checkout() {
  const { cartItems, user } = useContext(GlobalContext);
  return <h1>Checkout Page</h1>;
}
