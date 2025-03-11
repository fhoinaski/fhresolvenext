// src/app/dashboard/layout.tsx
'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { useEffect, useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Garantir que o componente só renderiza completamente após a montagem no lado do cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Renderização condicional para evitar erros de hidratação
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-card-bg)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    );
  }

  return (
    <SessionProvider>
      <ThemeProvider isDashboard={true}>
        <FeedbackProvider>
          <div className="min-h-screen flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Topbar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </FeedbackProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}