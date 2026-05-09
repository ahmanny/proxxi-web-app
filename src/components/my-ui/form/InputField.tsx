"use client";
import React from "react";
interface InputFieldProps {
  label: string;
  name: string;
  register: any;
  errors: any;
  isReadOnly?: boolean;
}
export default function InputField({
  label,
  name,
  register,
  errors,
  isReadOnly,
}: InputFieldProps) {
  return (
    <div className=" flex-col flex ">
      <label htmlFor={label} className="label-l2">
        {label}
      </label>
      <input
        {...register(name)}
        id={label}
        className=" input"
        readOnly={isReadOnly}
      />
      {errors?.[name]?.message && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
