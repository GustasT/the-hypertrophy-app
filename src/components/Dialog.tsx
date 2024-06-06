import React, { useEffect, useState } from "react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [showDialog, setShowDialog] = useState(isOpen);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowDialog(true);
      setTimeout(() => setVisible(true), 10); // Slight delay to trigger animation
    } else {
      setVisible(false);
      setTimeout(() => setShowDialog(false), 300); // Match the duration of the animation
    }
  }, [isOpen]);

  return (
    <>
      {showDialog && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end transition-opacity duration-300 z-20 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        >
          <div
            className={`bg-white rounded-t-lg shadow-lg w-full max-w-lg transition-transform duration-300 transform ${
              visible ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
            style={{ maxHeight: "70vh", marginBottom: "4rem" }}
          >
            <div className="sticky top-0 bg-white p-6 rounded-t-lg flex justify-between items-center border-b">
              <h2 className="text-xl font-bold">{title}</h2>
              <button className="text-xl font-bold" onClick={onClose}>
                &times;
              </button>
            </div>
            <div
              className="p-6 overflow-y-auto"
              style={{ maxHeight: "calc(70vh - 4rem)" }}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
