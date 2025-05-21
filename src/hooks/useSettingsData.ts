// src/hooks/useSettingsData.ts
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useFeedback } from '@/context/FeedbackContext';

export interface SettingsData {
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
  tracking: {
    facebookPixel: string;
    tiktokPixel: string;
    googleTagManager: string;
  };
  maintenanceMode: boolean;
}

export const useSettingsData = () => {
  const { showToast } = useFeedback();

  const [settings, setSettings] = useState<SettingsData>({
    siteName: 'FH Resolve',
    siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
    contactInfo: {
      email: 'contato@fhresolve.com.br',
      phone: '48991919791',
      address: 'Ratones, Florianópolis - SC',
    },
    socialMedia: {
      instagram: '',
      facebook: '',
      whatsapp: '48991919791',
    },
    tracking: {
      facebookPixel: '',
      tiktokPixel: '',
      googleTagManager: '',
    },
    maintenanceMode: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/site-config');
      if (response.data) {
        setSettings(response.data);
      }
    } catch (error: any) {
      console.error('Erro ao carregar configurações:', error);
      
      // Tratamento de erro mais detalhado
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;
        
        if (statusCode === 401 || statusCode === 403) {
          showToast('Sem permissão para acessar as configurações do site. Faça login novamente.', 'error');
        } else if (statusCode === 404) {
          showToast('Configurações não encontradas. Usando valores padrão.', 'info');
        } else if (statusCode === 500) {
          showToast(`Erro interno do servidor: ${errorMessage}`, 'error');
        } else if (error.code === 'ECONNABORTED') {
          showToast('Tempo de conexão esgotado. Verifique sua internet e tente novamente.', 'error');
        } else if (!navigator.onLine) {
          showToast('Você está offline. Verifique sua conexão com a internet.', 'error');
        } else {
          showToast(`Erro ao carregar configurações: ${errorMessage}`, 'error');
        }
      } else {
        showToast(`Erro inesperado: ${error.message || 'Erro desconhecido'}`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      
      // Validações básicas antes de enviar
      if (!settings.siteName.trim()) {
        showToast('O nome do site não pode estar vazio', 'error');
        return;
      }
      
      if (!settings.contactInfo.email.includes('@')) {
        showToast('Informe um email válido', 'error');
        return;
      }
      
      const response = await axios.post('/api/site-config', settings);
      if (response.data) {
        showToast('Configurações salvas com sucesso', 'success');
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error: any) {
      console.error('Erro ao salvar configurações:', error);
      
      // Tratamento de erro mais detalhado
      if (isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;
        
        if (statusCode === 400) {
          showToast(`Dados inválidos: ${errorMessage}`, 'error');
        } else if (statusCode === 401 || statusCode === 403) {
          showToast('Sem permissão para salvar as configurações. Faça login novamente.', 'error');
        } else if (statusCode === 413) {
          showToast('Os dados enviados são muito grandes. Reduza o tamanho dos valores.', 'error');
        } else if (statusCode === 429) {
          showToast('Muitas requisições. Aguarde alguns instantes e tente novamente.', 'error');
        } else if (statusCode === 500) {
          showToast(`Erro no servidor: ${errorMessage}`, 'error');
        } else if (error.code === 'ECONNABORTED') {
          showToast('Tempo de conexão esgotado. Verifique sua internet e tente novamente.', 'error');
        } else if (!navigator.onLine) {
          showToast('Você está offline. Verifique sua conexão com a internet.', 'error');
        } else {
          showToast(`Erro ao salvar configurações: ${errorMessage}`, 'error');
        }
      } else {
        showToast(`Erro inesperado: ${error.message || 'Erro desconhecido'}`, 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof SettingsData] as Record<string, unknown>),
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        },
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleSiteModeChange = (checked: boolean) => {
    setSettings(prev => ({ ...prev, maintenanceMode: checked }));
  };

  return {
    settings,
    loading,
    saving,
    saved,
    setSaving,
    setSaved,
    setSettings,
    fetchSettings,
    saveSettings,
    handleChange,
    handleSiteModeChange,
  };
};