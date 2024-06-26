"use Client";
import React, { useContext } from "react";
import NavBar from "../components/navbar/index";
import { GlobalContext } from "@/context";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-red-500">
        <h1>TrendFlix</h1>
      </main>
    </>
  );
}
