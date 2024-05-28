import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Add an optional className prop
  required?: boolean;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  className = "", // Default to an empty string if not provided
  required = true,
  placeholder = "",
}) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-gray-700">{label}</label>
    <input
      type={type}
      className="w-full p-2 border rounded"
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
