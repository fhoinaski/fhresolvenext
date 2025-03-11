'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '@/lib/axios';

export interface SiteThemes {
  light: ThemeColors;
  dark: ThemeColors;
}

export interface ThemeColors {
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

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  contactInfo: { email: string; phone: string; address: string };
  socialMedia: { instagram: string; facebook: string; whatsapp: string };
  themes: SiteThemes;
  activeTemplate: string;
  activeTheme: 'light' | 'dark' | 'system';
  maintenanceMode: boolean;
  logoUrl: string;
  faviconUrl: string;
}

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: Partial<SiteConfig>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const defaultThemeColors: ThemeColors = {
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
  accentDark: '#247885',
};

const defaultConfig: SiteConfig = {
  siteName: 'FH Resolve',
  siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
  contactInfo: {
    email: 'contato@fhresolve.com.br',
    phone: '48991919791',
    address: 'Ratones, Florianópolis - SC',
  },
  socialMedia: { instagram: '', facebook: '', whatsapp: '48991919791' },
  themes: {
    light: defaultThemeColors,
    dark: {
      ...defaultThemeColors,
      text: '#FFFFFF',
      dark: '#252525',
      light: '#333333',
      cardBg: '#333333',
      cardText: '#FFFFFF',
      gray: '#3A3A3A',
      neutral: '#8D9192',
    },
  },
  activeTemplate: 'default',
  activeTheme: 'light',
  maintenanceMode: false,
  logoUrl: '/logo.svg',
  faviconUrl: '/favicon.ico',
};

const SiteConfigContext = createContext<SiteConfigContextType | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/site-config');
        if (response.data) {
          setConfig((current) => ({
            ...current,
            ...response.data,
            themes: {
              light: { ...current.themes.light, ...(response.data.themes?.light || {}) },
              dark: { ...current.themes.dark, ...(response.data.themes?.dark || {}) },
            },
          }));
        }
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

  useEffect(() => {
    if (mounted && !loading) {
      const root = document.documentElement;
      const isDark = config.activeTheme === 'dark' || (config.activeTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const theme = isDark ? config.themes.dark : config.themes.light;
  
      // Aplicar todas as variáveis imediatamente
      Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
        if (key === 'accent' || key === 'secondary' || key === 'neutral') {
          const rgb = hexToRgb(value);
          if (rgb) {
            root.style.setProperty(`--color-${key}-rgb`, `${rgb.r}, ${rgb.g}, ${rgb.b}`);
          }
        }
      });
      
      // Adicionar um evento de mudança de tema para forçar repintura de elementos
      document.dispatchEvent(new CustomEvent('themechange', { 
        detail: { theme: isDark ? 'dark' : 'light' } 
      }));
    }
  }, [config, loading, mounted]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const updateConfig = async (newConfig: Partial<SiteConfig>) => {
    try {
      setLoading(true);
      const updatedConfig = {
        ...config,
        ...newConfig,
        themes: newConfig.themes
          ? {
              light: { ...config.themes.light, ...(newConfig.themes.light || {}) },
              dark: { ...config.themes.dark, ...(newConfig.themes.dark || {}) },
            }
          : config.themes,
      };
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

  if (!mounted) {
    return (
      <SiteConfigContext.Provider value={{ config: defaultConfig, updateConfig, loading: true, error: null }}>
        {children}
      </SiteConfigContext.Provider>
    );
  }

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, loading, error }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};