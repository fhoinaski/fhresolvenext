// src/context/AppContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface ThemeColors {
  primary: string;
  accent: string;
  secondary: string;
  neutral: string;
  text: string;
  textLight: string;
  dark: string;
  light: string;
  gray: string;
  cardBg: string;
  cardText: string;
  paralel: string;
  accentDark: string;
}

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  themes: {
    light: ThemeColors;
  };
  defaultTheme: 'light';
  activeTemplate: string;
  maintenanceMode: boolean;
  logoUrl: string;
  faviconUrl: string;
}

interface AppContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => Promise<void>;
  loading: boolean;
}

const defaultConfig: SiteConfig = {
  siteName: 'FH Resolve',
  siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
  contactInfo: { email: 'contato@fhresolve.com.br', phone: '48991919791', address: 'Ratones, Florianópolis - SC' },
  socialMedia: { instagram: '', facebook: '', whatsapp: '48991919791' },
  themes: {
    light: { 
      primary: '#252525', 
      accent: '#2B8D9A', 
      secondary: '#8D9192', 
      neutral: '#EDEDED', 
      text: '#252525', 
      textLight: '#FFFFFF', 
      dark: '#252525', 
      light: '#FFFFFF', 
      gray: '#EDEDED', 
      cardBg: '#FFFFFF', 
      cardText: '#252525', 
      paralel: '#F5F5F5', 
      accentDark: '#247885' 
    }
  },
  defaultTheme: 'light',
  activeTemplate: 'default',
  maintenanceMode: false,
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode; isDashboard?: boolean }> = ({ children, isDashboard = false }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get('/api/site-config');
        setConfig(data);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const applyTheme = () => {
    const root = document.documentElement;
    const colors = config.themes.light;
    Object.entries(colors).forEach(([key, value]) => root.style.setProperty(`--color-${key}`, value));
  };

  useEffect(() => {
    if (!loading) applyTheme();
  }, [config.themes, loading]);

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    setLoading(true);
    try {
      const updatedConfig = { ...config, ...newConfig };
      await axios.post('/api/site-config', updatedConfig);
      setConfig(updatedConfig);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ config, updateConfig, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};