'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { SiteConfigProvider } from '@/context/SiteConfigContext';
import { FeedbackProvider } from '@/context/FeedbackContext';

export function Providers({
  children,
  initialTheme = 'light',
  isDashboard = false
}: {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
  isDashboard?: boolean;
}) {
  return (
    <SiteConfigProvider>
      <ThemeProvider initialTheme={initialTheme} isDashboard={isDashboard}>
        <FeedbackProvider>
          {children}
        </FeedbackProvider>
      </ThemeProvider>
    </SiteConfigProvider>
  );
}