// components/common/ScrollToTopButton.tsx
import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

interface ScrollToTopButtonProps {
  isVisible: boolean;
  topRef: React.RefObject<HTMLDivElement>;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  isVisible,
  topRef,
}) => {
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 mb-20 p-2 bg-blue-500 text-white rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
    >
      <AiOutlineArrowUp size={24} />
    </button>
  );
};

export default ScrollToTopButton;
