// Button.tsx
import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  onClick?: () => void;
  variant: ButtonVariant;
  children: React.ReactNode;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  variant,
  children,
  type = "button",
  className = "",
  disabled = false,
}) => {
  let baseClassName;

  switch (variant) {
    case "primary":
      baseClassName =
        "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700";
      break;
    case "secondary":
      baseClassName =
        "bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500";
      break;
    case "outline":
      baseClassName = "text-black px-3 py-1 border rounded hover:bg-gray-200";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClassName} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
