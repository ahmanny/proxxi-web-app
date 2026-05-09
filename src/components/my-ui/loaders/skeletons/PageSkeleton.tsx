import React from "react";

export default function PageSkeleton() {
  return (
    <div className="p-5">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}
