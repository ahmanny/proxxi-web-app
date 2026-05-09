"use client";

import { colors } from "@/lib/contants/regular.constants";

interface ColorSelectorFieldProps {
  label: string;
  name: string;
  selectedColors: string[];
  handleColorChange: (color: string) => void;
  errors: any;
}

export default function ColorSelectorField({
  selectedColors,
  errors,
  name,
  label,
  handleColorChange,
}: ColorSelectorFieldProps) {
  return (
    <div className="w-full">
      <label className="label-l2">{label}</label>
      <div className="flex gap-2 mt-1 flex-wrap">
        {colors.map((color) => {
          const isSelected = selectedColors.includes(color);

          return (
            <button
              key={color}
              type="button"
              className={`p-1 rounded-full ${
                isSelected
                  ? "border-custom-900 dark:border-custom-50 border-2"
                  : "border-2 border-transparent"
              }`}
              onClick={() => handleColorChange(color)}
            >
              <span
                className={`h-10 w-10 rounded-full  block`}
                style={{ backgroundColor: color }}
              ></span>
            </button>
          );
        })}
      </div>
      {errors?.[name]?.message && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
