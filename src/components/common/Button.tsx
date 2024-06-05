import React, { CSSProperties } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonType = "button" | "submit" | "reset";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  onClick?: () => void;
  variant: ButtonVariant;
  children: React.ReactNode;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  size?: ButtonSize; // Add size prop
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant,
  children,
  type = "button",
  className = "",
  disabled = false,
  style = {},
  size = "medium", // Default size
}) => {
  let baseClassName;
  let disabledClassName;
  let sizeClassName;

  // Determine the base and disabled classes based on the variant
  switch (variant) {
    case "primary":
      baseClassName = "bg-blue-600 text-white rounded hover:bg-blue-700";
      disabledClassName = "bg-blue-400 text-white rounded cursor-not-allowed";
      break;
    case "secondary":
      baseClassName = "bg-gray-400 text-white rounded hover:bg-gray-500";
      disabledClassName = "bg-gray-300 text-white rounded cursor-not-allowed";
      break;
    case "outline":
      baseClassName = "text-black border rounded hover:bg-gray-200";
      disabledClassName = "text-gray-400 border rounded cursor-not-allowed";
      break;
  }

  // Determine the size classes based on the size
  switch (size) {
    case "small":
      sizeClassName = "px-2 py-1 text-sm";
      break;
    case "medium":
      sizeClassName = "px-4 py-2 text-base";
      break;
    case "large":
      sizeClassName = "px-6 py-3 text-lg";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${
        disabled ? disabledClassName : baseClassName
      } ${sizeClassName} ${className}`}
      type={type}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
