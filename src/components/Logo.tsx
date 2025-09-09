import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto', 
    lg: 'h-20 w-auto',
    xl: 'h-28 w-auto',
    '2xl': 'h-32 w-auto'
  };

  return (
    <img 
      src="/crackers-craze-logo.png" 
      alt="Crackers Craze Logo"
      className={`${sizeClasses[size]} ${className}`}
    />
  );
};
