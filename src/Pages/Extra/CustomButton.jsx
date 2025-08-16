import React from 'react';
import { Link } from 'react-router';

const CustomButton = ({
  children,
  to,
  onClick,
  type = 'button',
  className = '',
  ...rest
}) => {
  const baseClasses = `md:px-6 px-3 py-2 rounded-md text-xs md:text-sm font-medium shadow-md btn text-white 
    bg-gradient-to-r from-[#f65d4e] to-[#ff605b] 
    hover:bg-gradient-to-l hover:from-[#e6504e] hover:to-[#f65d4e] 
    transition duration-300 mt-4 ${className}`;


  if (to) {
    return (
      <Link to={to} className={baseClasses} {...rest}>
        {children}
      </Link>
    );
  }


  return (
    <button type={type} onClick={onClick} className={baseClasses} {...rest}>
      {children}
    </button>
  );
};

export default CustomButton;
