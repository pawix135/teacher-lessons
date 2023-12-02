import classNames from "classnames";
import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FunctionComponent<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={classNames(
        "bg-[#A946FE] mx-auto px-7 py-2 rounded-full hover:bg-[#95A7F9] transition duration-300 font-bold text-white disabled:bg-gray-500",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
