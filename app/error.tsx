'use client';

import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-lg flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Something went wrong!
          </h2>
          <p className="text-white text-opacity-70 mb-6">
            We encountered an error while loading Pocket Justice. This might be a temporary issue.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={reset}
            className="w-full"
          >
            Try Again
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Go to Home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="text-left mt-6">
            <summary className="text-sm text-white text-opacity-70 cursor-pointer">
              Error Details (Development)
            </summary>
            <pre className="text-xs text-red-300 mt-2 p-3 bg-black bg-opacity-30 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
