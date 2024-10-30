'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  reset,
}: {
  reset: () => void;
}) {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-5 text-center">Notas que algo ha fallado?</h2>
      <Button
        type="submit"
        variant="default"
        onClick={() => reset()}
      >
        Try again
      </Button>
    </div>
  );
}