// src/context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  isDashboard: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  isDashboard?: boolean;
  initialTheme?: 'light' | 'dark' | 'system';
}> = ({ children, isDashboard = false, initialTheme = 'system' }) => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(
    initialTheme === 'dark' ? 'dark' : 'light'
  );
  const [mounted, setMounted] = useState(false);

  // Função para aplicar o tema no documento
  const applyTheme = (newTheme: 'light' | 'dark') => {
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Forçar repintagem de todas as variáveis CSS
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      // Aplicar variáveis do tema escuro
      root.style.setProperty('--color-text', '#FFFFFF');
      root.style.setProperty('--color-dark', '#252525');
      root.style.setProperty('--color-light', '#333333');
      root.style.setProperty('--color-gray', '#3A3A3A');
      root.style.setProperty('--color-card-bg', '#333333');
      root.style.setProperty('--color-card-text', '#FFFFFF');
      root.style.setProperty('--color-neutral', '#8D9192');
    } else {
      // Aplicar variáveis do tema claro
      root.style.setProperty('--color-text', '#252525');
      root.style.setProperty('--color-dark', '#252525');
      root.style.setProperty('--color-light', '#FFFFFF');
      root.style.setProperty('--color-gray', '#EDEDED');
      root.style.setProperty('--color-card-bg', '#FFFFFF');
      root.style.setProperty('--color-card-text', '#252525');
      root.style.setProperty('--color-neutral', '#EDEDED');
    }
    
    // Outras variáveis que permanecem constantes em ambos os temas
    root.style.setProperty('--color-primary', '#252525');
    root.style.setProperty('--color-accent', '#2B8D9A');
    root.style.setProperty('--color-secondary', '#8D9192');
    root.style.setProperty('--color-text-light', '#FFFFFF');
    root.style.setProperty('--color-paralel', newTheme === 'dark' ? '#EDEDED' : '#F5F5F5');
    root.style.setProperty('--color-accent-dark', '#247885');
    
    // Definir valores RGB para cores que precisam de transparência
    const accentRgb = '43, 141, 154'; // #2B8D9A
    const secondaryRgb = '141, 145, 146'; // #8D9192
    const neutralRgb = newTheme === 'dark' ? '141, 145, 146' : '237, 237, 237'; // #8D9192 ou #EDEDED
    
    root.style.setProperty('--color-accent-rgb', accentRgb);
    root.style.setProperty('--color-secondary-rgb', secondaryRgb);
    root.style.setProperty('--color-neutral-rgb', neutralRgb);
  }

  useEffect(() => {
    setMounted(true);
    const storageKey = isDashboard ? 'dashboard-theme' : 'site-theme';
    const savedTheme = localStorage.getItem(storageKey) as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    let resolvedTheme: 'light' | 'dark';
    if (initialTheme === 'system') {
      resolvedTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    } else {
      resolvedTheme = (initialTheme as 'light' | 'dark') || (savedTheme ?? 'light');
    }
  
    setThemeState(resolvedTheme);
    // Aplicar o tema no momento do carregamento
    applyTheme(resolvedTheme);
    
    // Adicionar listener para mudanças de preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (initialTheme === 'system' && !savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        applyTheme(newTheme);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isDashboard, initialTheme]);

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    if (typeof window !== 'undefined') {
      const storageKey = isDashboard ? 'dashboard-theme' : 'site-theme';
      localStorage.setItem(storageKey, newTheme);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  if (!mounted) {
    // Durante SSR, retorna um tema padrão para evitar diferenças
    return (
      <ThemeContext.Provider
        value={{ theme: initialTheme === 'dark' ? 'dark' : 'light', toggleTheme, setTheme, isDashboard }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDashboard }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};