import React from "react";

const Unauthorized = () => {
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-400 px-5 py-5">
      <div className="rounded-md bg-white px-40 py-20 shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-bold text-blue-600">401</h1>
          <h6 className="mb-2 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Unauthorized
          </h6>
          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Sorry, your request could not be processed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
