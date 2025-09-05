'use client';

import { cn } from '@/lib/utils';
import { CardProps } from '@/lib/types';

export function Card({
  variant = 'default',
  children,
  className = '',
  onClick
}: CardProps) {
  const baseClasses = 'glass-card transition-all duration-200';
  
  const variantClasses = {
    default: 'hover:bg-opacity-15',
    highlighted: 'bg-opacity-20 border-opacity-40 hover:bg-opacity-25'
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={cn(
        baseClasses,
        variantClasses[variant],
        onClick && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
