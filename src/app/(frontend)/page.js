"use Client";
import React, { useContext } from "react";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between text-red-500 mt-[80px]">
        <h1>TrendFlix</h1>
      </main>
    </>
  );
}
