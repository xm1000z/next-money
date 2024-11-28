'use client';

import { useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export function ErrorBoundary({
  children,
  fallback
}: ErrorBoundaryProps) {
  useEffect(() => {
    const handleError = (error: Error) => {
      console.error('Error capturado:', error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return <>{children}</>;
} 