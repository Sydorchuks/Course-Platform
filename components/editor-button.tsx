import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClickableButton = ({ children, onClick, ...props }: any) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsClicked((prev) => !prev); // Toggle the clicked state
    onClick?.(e);
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      className={`px-4 py-2 rounded-md transition-colors ${
        isClicked ? "bg-blue-200" : "bg-gray-100"
      } hover:bg-gray-200`}
    >
      {children}
    </button>
  );
};

export default ClickableButton;