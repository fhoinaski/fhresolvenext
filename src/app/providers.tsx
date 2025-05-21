'use client';

import { SessionProvider } from 'next-auth/react';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { AppProvider } from '@/context/AppContext';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Criar uma instância do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000, // 1 hora de "stale time" para cache
      gcTime: 24 * 60 * 60 * 1000, // 24 horas de tempo de limpeza do garbage collector
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
}

export function Providers({ children, initialTheme = 'system' }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider isDashboard={false}>
          <FeedbackProvider>
            {children}
          </FeedbackProvider>
        </AppProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}