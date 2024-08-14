// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children, type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 flex justify-center items-center rounded shadow ${className} transition-colors duration-300`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
