// src/app/dashboard/layout.tsx
'use client';

import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { SessionProvider } from 'next-auth/react';
import { FeedbackProvider } from '@/context/FeedbackContext';
import { AppProvider } from '@/context/AppContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppProvider isDashboard={true}>
        <FeedbackProvider>
          <div className="min-h-screen flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Topbar />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </FeedbackProvider>
      </AppProvider>
    </SessionProvider>
  );
}