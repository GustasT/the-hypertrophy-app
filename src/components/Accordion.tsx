import React, { useState, useRef, useEffect, ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";

interface AccordionProps {
  title: ReactNode;
  isExpanded?: boolean;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  isExpanded = false,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(isExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(isOpen ? "auto" : 0);
  const [isVisible, setIsVisible] = useState(isExpanded);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setHeight(contentRef.current?.scrollHeight || "auto");
    } else {
      setHeight(0);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 0); // Match this duration with the height transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div className="p-4 border rounded">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="w-11/12">{title}</div>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </div>
      <div
        ref={contentRef}
        style={{ height }}
        className={`transition-height duration-300 ease-in-out overflow-hidden`}
      >
        <div
          className={`transition-opacity duration-300 ease-in-out mt-2 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
