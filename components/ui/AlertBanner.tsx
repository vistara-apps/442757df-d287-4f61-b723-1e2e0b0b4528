'use client';

import { X } from 'lucide-react';
import { AlertBannerProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function AlertBanner({ variant, message, onClose }: AlertBannerProps) {
  const variantClasses = {
    info: 'bg-blue-500 bg-opacity-20 border-blue-400 text-blue-100',
    warning: 'bg-yellow-500 bg-opacity-20 border-yellow-400 text-yellow-100',
    success: 'bg-green-500 bg-opacity-20 border-green-400 text-green-100',
    error: 'bg-red-500 bg-opacity-20 border-red-400 text-red-100'
  };

  return (
    <div className={cn(
      'flex items-center justify-between p-4 rounded-lg border backdrop-blur-sm',
      variantClasses[variant]
    )}>
      <p className="text-sm font-medium">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
