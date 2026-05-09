"use client";

import { sizes } from "@/lib/contants/regular.constants";

interface SizeSelectorFieldProps {
  label: string;
  name: string;
  selectedSizes: string[];
  handleSizeChange: (size: string) => void;
  errors: any;
}

export default function SizeSelectorField({
  selectedSizes,
  errors,
  name,
  label,
  handleSizeChange,
}: SizeSelectorFieldProps) {
  return (
    <div className="w-full">
      <label className="label-l2">{label}</label>
      <div className="flex gap-2 flex-wrap mt-1">
        {sizes.map((size) => {
          const isSelected = selectedSizes.includes(size);
          return (
            <label
              key={size}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleSizeChange(size)}
                className="hidden"
              />
              <span
                className={` h-10 w-10 border text-sm rounded-md flex items-center  justify-center ${
                  isSelected ? "bg-gray-200" : ""
                }`}
              >
                {size}
              </span>
            </label>
          );
        })}
      </div>
      {errors?.[name]?.message && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
