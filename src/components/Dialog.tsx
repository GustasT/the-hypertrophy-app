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
      document.body.classList.add("overflow-hidden"); // Disable background scroll
    } else {
      setVisible(false);
      setTimeout(() => setShowDialog(false), 300); // Match the duration of the animation
      document.body.classList.remove("overflow-hidden"); // Re-enable background scroll
    }

    // Clean up function to ensure no-scroll class is removed when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
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
            className={`bg-white rounded-t-lg shadow-lg w-full max-w-lg transition-transform duration-300 transform overflow-hidden ${
              visible ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
            style={{ height: "calc(90dvh - 4rem)", marginBottom: "4rem" }} // Adjust for bottom navbar with margin
          >
            <div className="flex flex-col h-full">
              <div className="flex-none px-6 py-4 border-b  flex justify-between items-center">
                <h2 className="text-xl font-bold">{title}</h2>
                <button className="text-xl font-bold" onClick={onClose}>
                  &times;
                </button>
              </div>
              <div className="flex-auto p-6 overflow-y-auto">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
