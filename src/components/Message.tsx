import React from "react";

interface MessageProps {
  message: string;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className="mb-4">
      <p
        className={
          message.includes("success") ? "text-green-600" : "text-red-600"
        }
      >
        {message}
      </p>
    </div>
  );
};

export default Message;
