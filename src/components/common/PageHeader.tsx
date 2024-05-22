import React from "react";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  buttonText: string;
  buttonAction?: () => void;
  buttonLink?: string; // Optional: use this if the button should link to a new route
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  buttonText,
  buttonAction,
  buttonLink,
}) => {
  return (
    <div className="flex justify-between p-4 top-0 sticky bg-white border-b">
      <h1 className="text-2xl font-bold">{title}</h1>
      {buttonLink ? (
        <Link to={buttonLink}>
          <Button variant="primary">{buttonText}</Button>
        </Link>
      ) : (
        <Button variant="primary" onClick={buttonAction}>
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
