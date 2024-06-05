// Button.tsx
import React, { CSSProperties } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  onClick?: () => void;
  variant: ButtonVariant;
  children: React.ReactNode;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant,
  children,
  type = "button",
  className = "",
  disabled = false,
  style = {}, // Add default value for style
}) => {
  let baseClassName;
  let disabledClassName;

  switch (variant) {
    case "primary":
      baseClassName =
        "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700";
      disabledClassName =
        "bg-blue-400 text-white px-4 py-2 rounded cursor-not-allowed";
      // seperate class for disabled button, because by default its see through and shines throgh the header
      break;
    case "secondary":
      baseClassName =
        "bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500";
      disabledClassName =
        "bg-gray-300 text-white px-4 py-2 rounded cursor-not-allowed";
      break;
    case "outline":
      baseClassName = "text-black px-4 py-2 border rounded hover:bg-gray-200";
      disabledClassName =
        "text-gray-400 px-4 py-2 border rounded cursor-not-allowed";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${disabled ? disabledClassName : baseClassName} ${className}`}
      type={type}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
