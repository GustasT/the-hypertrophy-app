import React from "react";

interface NumericInputProps {
  value: string;
  setIndex: number;
  field: string;
  onInputChange: (setIndex: number, field: string, value: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  setIndex,
  field,
  onInputChange,
  className,
  placeholder,
  disabled,
  onFocus,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
    ];

    // Allow Ctrl+A, Ctrl+C, Ctrl+V
    if (e.ctrlKey && ["a", "c", "v"].includes(e.key.toLowerCase())) {
      return;
    }

    // Allow navigation keys
    if (allowedKeys.includes(e.key)) {
      return;
    }

    // Prevent non-numeric input
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      onInputChange(setIndex, field, value);
    }
  };

  return (
    <input
      type="text"
      value={value}
      name={field}
      inputMode="numeric"
      pattern="[0-9]*"
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border p-2 ${className}`}
      disabled={disabled}
      onFocus={onFocus}
    />
  );
};

export default NumericInput;
