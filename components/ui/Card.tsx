'use client';

import { CardProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function Card({
  variant = 'default',
  children,
  className = '',
  onClick,
  ...props
}: CardProps) {
  const baseClasses = 'bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg transition-all duration-200';
  
  const variants = {
    default: 'hover:bg-opacity-15',
    highlighted: 'bg-opacity-20 border-opacity-30 shadow-lg'
  };

  const interactiveClasses = onClick ? 'cursor-pointer hover:scale-105' : '';

  return (
    <div
      onClick={onClick}
      className={cn(
        baseClasses,
        variants[variant],
        interactiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
