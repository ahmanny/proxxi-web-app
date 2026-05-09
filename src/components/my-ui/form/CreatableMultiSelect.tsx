"use client";

import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Controller } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  name: string;
  control: any;
  options: string[];
  placeholder?: string;
  errors?: any;
}

export const CreatableMultiSelect: React.FC<Props> = ({
  label,
  name,
  control,
  options,
  placeholder,
  errors,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // detect theme on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const selectOptions: Option[] = options.map((opt) => ({
    label: opt,
    value: opt,
  }));

  const customStyles = (isDarkMode: boolean) => ({
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#ffffff",
      borderColor: state.isFocused
        ? isDarkMode
          ? "#1c75ff" // Tailwind: blue-700
          : "#3b82f6" // Tailwind: blue-500
        : isDarkMode
        ? "#202533" // Tailwind custom-800
        : "#e5e7eb ", // Tailwind gray-200
      boxShadow: "none",
      padding: "2px",
      borderRadius: "5px",
      "&:hover": {
        borderColor: state.isFocused
          ? isDarkMode
            ? "#1c75ff"
            : "#3b82f6"
          : isDarkMode
          ? "#202533"
          : "#ffffff",
      },
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDarkMode
          ? "#2563eb" // dark mode hover background color
          : "#bfdbfe" // light mode hover background color
        : isDarkMode
        ? "#1c1c1c" // dark mode normal background
        : "#ffffff", // light mode normal background
      color: state.isFocused
        ? isDarkMode
          ? "#ffffff" // dark mode hover text color
          : "#1e3a8a" // light mode hover text color
        : isDarkMode
        ? "#e5e7eb" // dark mode normal text color
        : "#374151", // light mode normal text color
      cursor: "pointer",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#ffffff",
      color: isDarkMode ? "#ffffff" : "#1f2937", // optional text color
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: isDarkMode ? "#0E1422" : "#f6f6f6",
      borderRadius: "5px",
      padding: "1px 4px",
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: isDarkMode ? "#B6B7BC" : "#0E1422",
      ":hover": {
        color: "red",
        cursor: "pointer",
      },
    }),
  });

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="label-l2">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CreatableSelect
            isMulti
            instanceId={`select-${name}`}
            options={selectOptions}
            onChange={(selected) => {
              field.onChange(selected.map((opt) => opt.value));
            }}
            value={
              field.value?.map((val: string) => ({
                label: val,
                value: val,
              })) || []
            }
            className="text-black"
            placeholder={placeholder}
            styles={customStyles(isDarkMode)}
          />
        )}
      />
      {errors?.[name]?.message && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
};
