'use client';

import { cn } from '@/lib/utils';
import { ButtonProps } from '@/lib/types';

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  children,
  className = ''
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'btn-primary focus:ring-blue-500',
    secondary: 'btn-secondary focus:ring-white',
    danger: 'btn-danger focus:ring-red-500',
    outline: 'border-2 border-white border-opacity-50 text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg focus:ring-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        size !== 'md' ? sizeClasses[size] : '',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
