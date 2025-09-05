'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'text' | 'textarea';
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant: 'textarea';
}

type CombinedProps = InputProps | TextareaProps;

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, CombinedProps>(
  ({ className, label, error, variant = 'text', ...props }, ref) => {
    const baseClasses = 'w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm transition-all duration-200';

    const Component = variant === 'textarea' ? 'textarea' : 'input';

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white">
            {label}
          </label>
        )}
        <Component
          ref={ref as any}
          className={cn(baseClasses, className)}
          {...(props as any)}
        />
        {error && (
          <p className="text-sm text-red-300">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
