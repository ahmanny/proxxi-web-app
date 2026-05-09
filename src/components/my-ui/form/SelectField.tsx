"use client";

interface SelectFieldProps {
  label: string;
  options: string[];
  name: string;
  register: any;
  errors?: any;
}

export default function SelectField({
  errors,
  label,
  name,
  options,
  register,
}: SelectFieldProps) {
  return (
    <div>
      {/* category input/dropdown */}
      <div className=" flex-col flex ">
        <label htmlFor={label} className="label-l2">
          {label}
        </label>
        <select
          id={label}
          {...register(name)}
          className="input bg-white cursor-pointer"
        >
          <option value="">Select...</option>
          {options.map((option, index) => (
            <option key={index} value={option} className="capitalize">
              {option}
            </option>
          ))}
        </select>
        {errors?.[name]?.message && (
          <p className="text-red-500 text-sm">
            {String(errors[name]?.message)}
          </p>
        )}
      </div>
    </div>
  );
}
