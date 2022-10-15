import React from "react";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-700 opacity-75">
      <div className="relative h-14 w-11 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
        <div className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-gray-200" />
      </div>
    </div>
  );
};

export default Spinner;
