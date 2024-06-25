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
  zIndex?: number; // Add zIndex prop
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  isClearable = false,
  isSearchable = false,
  placeholder = "",
  zIndex = 100, // Default zIndex to 100
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
      styles={{
        control: (provided) => ({
          ...provided,
        }),
        menu: (provided) => ({
          ...provided,
          zIndex,
        }),
        menuPortal: (base) => ({
          ...base,
          zIndex,
        }),
      }}
      menuPortalTarget={document.body} // Render menu in portal
    />
  </div>
);

export default SelectField;
