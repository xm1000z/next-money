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
    const handleError = (event: ErrorEvent) => {
      console.error('Error capturado:', event.error);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return <>{children}</>;
} 