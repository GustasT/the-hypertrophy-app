import React, { useState, useRef, useEffect, ReactNode } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";

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
  const [isOpen, setIsOpen] = useState<boolean>(isExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>(isOpen ? "auto" : 0);
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setHeight(contentRef.current?.scrollHeight || "auto");
    } else {
      setHeight(0);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match this duration with the height transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen((prevIsOpen: boolean) => !prevIsOpen); // Explicitly define the type of prevIsOpen
  };

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between items-center">
        <div className="w-11/12 mr-4">{title}</div>
        <span
          className={`transform transition-transform duration-300 cursor-pointer ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          onClick={toggleAccordion}
        >
          <HiOutlineChevronDown size={22} />
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
