'use client';

import { useAppContext } from '@/context/AppContext';

export const useSiteConfig = () => {
  const context = useAppContext();
  if (!context) {
    throw new Error('useSiteConfig deve ser usado dentro de um AppProvider');
  }
  return {
    config: context.config,
    updateConfig: context.updateConfig,
    loading: context.loading,
    theme: context.theme,
    setTheme: context.setTheme,
    toggleTheme: context.toggleTheme
  };
}; 