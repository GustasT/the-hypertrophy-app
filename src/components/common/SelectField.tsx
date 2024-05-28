import React from "react";
import Select from "react-select";

interface SelectFieldProps {
  label: string;
  options: { value: number | string; label: string }[];
  value: { value: number | string; label: string } | null;
  onChange: (option: any) => void;
  isClearable?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  isClearable = false,
  isSearchable = false,
  placeholder = "",
}) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isClearable={isClearable}
      isSearchable={isSearchable}
      placeholder={placeholder}
    />
  </div>
);

export default SelectField;
