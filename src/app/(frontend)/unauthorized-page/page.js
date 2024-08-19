"use client";

import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();
  return (
    <section className="h-screen bg-gray-200 mt-[80px] text-black">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
          <div className="bg-white shadow">
            <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
              <h1 className="font-bold text-lg">
                You don't have access to view this page!
              </h1>
              <button
                type="button"
                className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                onClick={() => router.push("/")}
              >
                Go To Home Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
