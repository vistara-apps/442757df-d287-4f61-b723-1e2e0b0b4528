'use client';

import { AlertBannerProps } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from 'lucide-react';

export function AlertBanner({
  variant,
  title,
  message,
  onClose,
  className = ''
}: AlertBannerProps) {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertCircle
  };

  const variants = {
    info: 'bg-blue-500 bg-opacity-20 border-blue-400 text-blue-100',
    warning: 'bg-yellow-500 bg-opacity-20 border-yellow-400 text-yellow-100',
    success: 'bg-green-500 bg-opacity-20 border-green-400 text-green-100',
    error: 'bg-red-500 bg-opacity-20 border-red-400 text-red-100'
  };

  const Icon = icons[variant];

  return (
    <div className={cn(
      'flex items-start gap-3 p-4 rounded-lg border backdrop-blur-sm',
      variants[variant],
      className
    )}>
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="font-medium mb-1">{title}</h4>
        )}
        <p className="text-sm opacity-90">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
