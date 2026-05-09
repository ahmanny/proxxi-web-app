import React from "react";

export default function SpinnerOne() {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-custom-900 bg-opacity-50 backdrop-blur-sm">
      <div className=" animate-spin w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"></div>
    </div>
  );
}
