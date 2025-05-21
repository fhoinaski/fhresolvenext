// src/context/SiteConfigContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';

interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactInfo: { email: string; phone: string; address: string };
  socialMedia: { instagram?: string; facebook?: string; whatsapp?: string };
  tracking: { facebookPixel: string; tiktokPixel: string; googleTagManager: string };
  updatedAt: Date;
}

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>({
    siteName: 'FH Resolve',
    siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
    contactInfo: { email: 'contato@fhresolve.com.br', phone: '48991919791', address: 'Ratones, Florianópolis - SC' },
    socialMedia: { instagram: '', facebook: '', whatsapp: '48991919791' },
    tracking: { facebookPixel: '', tiktokPixel: '', googleTagManager: '' },
    updatedAt: new Date(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get('/api/site-config');
        setConfig(response.data);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar configurações:', err);
        setError('Falha ao carregar configurações do site');
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    try {
      setLoading(true);
      const updatedConfig = { ...config, ...newConfig };
      await axios.post('/api/site-config', updatedConfig);
      setConfig(updatedConfig);
      setError(null);
    } catch (err) {
      console.error('Erro ao atualizar configurações:', err);
      setError('Falha ao salvar configurações do site');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, loading, error }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  return context;
};