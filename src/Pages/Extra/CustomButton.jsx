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
  const baseClasses = `px-6 py-2 rounded-md text-sm font-medium shadow-md btn text-white 
    bg-gradient-to-r from-[#e6504e] to-[#ff605b] 
    hover:bg-gradient-to-l hover:from-[#e6504e] hover:to-[#ff605b] 
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
