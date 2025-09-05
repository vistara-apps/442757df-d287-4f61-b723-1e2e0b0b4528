'use client';

import { ButtonProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 focus:ring-white backdrop-blur-sm',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-white border-opacity-50 text-white hover:bg-white hover:bg-opacity-10 focus:ring-white',
    'icon-only': 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 focus:ring-white backdrop-blur-sm p-2'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl'
  };

  const iconOnlySizes = {
    sm: 'p-2 rounded-md',
    md: 'p-3 rounded-lg',
    lg: 'p-4 rounded-xl'
  };

  const sizeClasses = variant === 'icon-only' ? iconOnlySizes[size] : sizes[size];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        baseClasses,
        variants[variant],
        sizeClasses,
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </button>
  );
}
