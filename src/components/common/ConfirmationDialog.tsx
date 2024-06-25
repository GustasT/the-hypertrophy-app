import React from "react";
import Button from "./Button";

interface ConfirmationDialogProps {
  title?: string;
  message: string;
  continueText: string;
  cancelText: string;
  onContinue: () => void;
  onCancel: () => void;
  isVisible: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  message,
  continueText,
  cancelText,
  onContinue,
  onCancel,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <Button onClick={onCancel} variant="outline" className="mr-2">
            {cancelText}
          </Button>
          <Button onClick={onContinue} variant="secondary">
            {continueText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
