import React from "react";
import Select, { components } from "react-select";
import { AiOutlineYoutube } from "react-icons/ai";

interface SelectFieldProps {
  label: string;
  options: {
    value: number | string;
    label: string;
    youtubeLink?: string; // Optional YouTube link
  }[];
  value: { value: number | string; label: string } | null;
  onChange: (option: any) => void;
  isClearable?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  zIndex?: number;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
  isClearable = false,
  isSearchable = false,
  placeholder = "",
  zIndex = 100,
}) => {
  const CustomOption = (props: any) => {
    return (
      <components.Option {...props}>
        <div className="flex items-center justify-between">
          <span>{props.data.label}</span>
          {props.data.youtubeLink && (
            <a
              href={props.data.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={(e) => e.stopPropagation()} // Prevents closing the dropdown on click
            >
              <AiOutlineYoutube />
            </a>
          )}
        </div>
      </components.Option>
    );
  };

  return (
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
        menuPortalTarget={document.body}
        components={{ Option: CustomOption }} // Use the custom option component
      />
    </div>
  );
};

export default SelectField;
