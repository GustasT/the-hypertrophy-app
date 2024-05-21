// PrimaryButton.tsx
import React, { FC, ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => (
  <button
    type="button"
    className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
      props.disabled && "opacity-50 cursor-not-allowed"
    }`}
    {...props}
  >
    {children}
  </button>
);

// SecondaryButton.tsx
interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SecondaryButton: FC<SecondaryButtonProps> = ({
  children,
  ...props
}) => (
  <button
    type="button"
    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
    {...props}
  >
    {children}
  </button>
);

// OutlineButton.tsx
interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const OutlineButton: FC<OutlineButtonProps> = ({
  children,
  ...props
}) => (
  <button
    type="button"
    className="border border-gray-500 text-gray-500 px-4 py-2 rounded mr-2 hover:bg-gray-200"
    {...props}
  >
    {children}
  </button>
);
