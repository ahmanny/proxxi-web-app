"use client";

import React from "react";
interface NumberInputProps {
  label: string;
  name: string;
  register: any;
  errors?: any;
}

export default function NumberInput({
  label,
  name,
  register,
  errors,
}: NumberInputProps) {
  return (
    <div className=" flex-col flex ">
      <label htmlFor={name} className="label-l2">
        {label}
      </label>
      <input type="number" {...register(name)} id="price" className=" input" />
      {errors?.[name]?.message && (
        <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
