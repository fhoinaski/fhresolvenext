// src/context/SiteConfigContext.tsx (Arquivo renomeado de AppContext.tsx)
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast'; // Para feedback ao usuário

// Interface para a configuração do site
export interface SiteConfigData {
  siteName: string;
  siteDescription: string;
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    instagram?: string; // Tornar opcional se puderem estar vazios
    facebook?: string;
    whatsapp?: string;
  };
  tracking?: { // Tornar tracking opcional
    facebookPixel?: string;
    tiktokPixel?: string;
    googleTagManager?: string;
  };
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
    styles: { [key: string]: string }; // Estilos como chave-valor
  }>;
  activeTemplate: string; // ID ou nome do template ativo
  // Adicionar quaisquer outros campos de configuração necessários
}

interface SiteConfigContextType {
  config: SiteConfigData | null; // Permitir nulo enquanto carrega
  updateConfig: (newConfig: Partial<SiteConfigData>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const defaultConfig: SiteConfigData = {
  siteName: 'FH Resolve',
  siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
  contactInfo: { email: 'contato@fhresolve.com.br', phone: '48991919791', address: 'Ratones, Florianópolis - SC' },
  socialMedia: { instagram: '', facebook: '', whatsapp: '48991919791' },
  tracking: { facebookPixel: '', tiktokPixel: '', googleTagManager: '' },
  maintenanceMode: false,
  logoUrl: '/logo.svg', // Caminho para o logo padrão
  faviconUrl: '/favicon.ico', // Caminho para o favicon padrão
  services: [
    { id: '1', name: 'Manutenção Geral', description: 'Serviços gerais para sua casa.', icon: 'wrench', price: 'A combinar', duration: 'Variável' }
  ],
  templates: [
    { id: 'default', name: 'Padrão', styles: { primary: '#1B3A5C', accent: '#2E94D4' } }
  ],
  activeTemplate: 'default',
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}

export const SiteConfigProvider: React.FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<SiteConfigData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<SiteConfigData>('/api/site-config');
        setConfig(data);
      } catch (err: any) {
        console.error('Falha ao carregar configurações do site:', err);
        setError(err.response?.data?.error || err.message || 'Erro ao carregar configurações.');
        setConfig(defaultConfig); // Fallback para config padrão em caso de erro
        toast.error("Falha ao carregar configurações do site. Usando padrões.");
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const updateConfig = async (newConfigPartial: Partial<SiteConfigData>) => {
    if (!config) {
      toast.error("Configuração base não carregada, não é possível atualizar.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Deep merge para contactInfo, socialMedia, tracking
      const updatedConfig: SiteConfigData = {
        ...config,
        ...newConfigPartial,
        contactInfo: { ...config.contactInfo, ...newConfigPartial.contactInfo },
        socialMedia: { ...config.socialMedia, ...newConfigPartial.socialMedia },
        tracking: { ...config.tracking, ...newConfigPartial.tracking },
      };
      
      const { data } = await axios.post<SiteConfigData>('/api/site-config', updatedConfig);
      setConfig(data);
      toast.success('Configurações salvas com sucesso!');
    } catch (err: any) {
      console.error('Falha ao salvar configurações do site:', err);
      setError(err.response?.data?.error || err.message || 'Erro ao salvar configurações.');
      toast.error(err.response?.data?.error || "Erro ao salvar configurações.");
      throw err; // Re-throw para que o chamador possa lidar com o erro
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

// Remover o arquivo src/context/SiteConfigContext.tsx
// Remover o hook src/hooks/useSettingsData.ts
// Atualizar importações de useAppContext para useSiteConfig e AppProvider para SiteConfigProvider
// Por exemplo, em src/app/dashboard/appearance/page.tsx e src/hooks/useSiteConfig.ts