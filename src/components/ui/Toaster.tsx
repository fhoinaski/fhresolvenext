'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      toastOptions={{
        style: {
          background: 'var(--color-card-bg)',
          color: 'var(--color-card-text)',
          border: '1px solid var(--color-neutral)',
        },
      }}
    />
  );
} 