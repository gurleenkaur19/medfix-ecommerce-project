"use client";

import { useRouter } from "next/router";

const CustomError = ({ statusCode }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{statusCode}</h1>
        <p className="text-2xl mt-4">An error occurred on the server</p>
        <p className="text-lg mt-2">Please try again later.</p>
        <button
          onClick={handleGoHome}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

CustomError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
