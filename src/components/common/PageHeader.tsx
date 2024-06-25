import React from "react";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  buttonText?: string;
  buttonAction?: () => void;
  buttonLink?: string; // Optional: use this if the button should link to a new route
  buttonDisabled?: boolean; // Optional: use this to disable the button
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  buttonText,
  buttonAction,
  buttonLink,
  buttonDisabled,
}) => {
  return (
    <div className="fixed top-0 w-full h-16 bg-white border-b border-gray-200 z-10">
      <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {buttonText &&
          (buttonAction || buttonLink) &&
          (buttonLink ? (
            <Link to={buttonLink}>
              <Button variant="primary" disabled={buttonDisabled} size="lg">
                {buttonText}
              </Button>
            </Link>
          ) : (
            <Button
              variant="primary"
              onClick={buttonAction}
              disabled={buttonDisabled}
              size="lg"
            >
              {buttonText}
            </Button>
          ))}
      </div>
    </div>
  );
};

export default PageHeader;
