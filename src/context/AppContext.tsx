// src/context/AppContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';

// removed theme colors interface

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
  activeTemplate: string;
  maintenanceMode: boolean;
  logoUrl: string;
  faviconUrl: string;  
  services: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    price?: string;
    duration?: string;
  }>;
  templates: Array<{
    id: string;
    name: string;
    styles: { [key: string]: string };
  }>;
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
  activeTemplate: 'default',  
  maintenanceMode: false,
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
  services: [
    {
      id: '1',
      name: 'Manutenção Geral',
      description: 'Serviços de manutenção residencial e comercial',
      icon: 'wrench',
      price: 'A partir de R$ 100',
      duration: '1-2 horas'
    }
  ],
  templates: [
    {
      id: 'default',
      name: 'Template Padrão',
      styles: {
        primary: '#252525',
        secondary: '#8D9192',
        accent: '#2B8D9A'
      }
    }
  ]
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

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
    <AppContext.Provider value={{ 
      config, 
      updateConfig, 
      loading
    }}>
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