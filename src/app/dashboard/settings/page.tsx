// src/app/dashboard/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, Heading } from '@/components/ui/Card';
import { Save, Loader2, CheckCircle, AlertTriangle, Lock, Globe, Moon, Sun, Monitor } from 'lucide-react';
import axios from '@/lib/axios';
import { RoleGuard } from '@/components/RoleGuard';

import { useTheme } from '@/context/ThemeContext';
import { useFeedback } from '@/context/FeedbackContext';

interface SettingsData {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  defaultTheme: 'light' | 'dark' | 'system';
  analyticsId: string;
  maintenanceMode: boolean;
}

export default function SettingsPage() {
  const { showToast } = useFeedback();
  const { theme, setTheme } = useTheme();

  const [settings, setSettings] = useState<SettingsData>({
    siteName: 'FH Resolve',
    siteDescription: 'Serviços profissionais de manutenção residencial em Florianópolis',
    contactEmail: 'contato@fhresolve.com.br',
    contactPhone: '48991919791',
    socialMedia: {
      instagram: '',
      facebook: '',
      whatsapp: '48991919791',
    },
    defaultTheme: 'light',
    analyticsId: '',
    maintenanceMode: false,
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'contact' | 'advanced'>('general');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/settings');
      
      if (response.data) {
        setSettings({
          ...settings,
          ...response.data
        });
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      showToast('Erro ao carregar configurações', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      const response = await axios.post('/api/settings', settings);
      
      if (response.data) {
        showToast('Configurações salvas com sucesso', 'success');
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      showToast('Erro ao salvar configurações', 'error');
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
          ...prev[parent as keyof typeof prev],
          [child]: (e.target as HTMLInputElement).type === 'checkbox' 
            ? (e.target as HTMLInputElement).checked 
            : value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : value
      }));
    }
  };

  const handleSiteModeChange = (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      maintenanceMode: checked
    }));
  };

  // Aplica o tema do dashboard imediatamente ao mudar
  const handleDashboardThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    showToast(`Tema do dashboard alterado para ${newTheme === 'light' ? 'claro' : 'escuro'}`, 'success');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Heading title="Configurações" description="Gerencie as configurações do site" />
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Salvando...
              </>
            ) : saved ? (
              <>
                <CheckCircle size={16} />
                Salvo!
              </>
            ) : (
              <>
                <Save size={16} />
                Salvar Alterações
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar de navegação */}
          <div className="col-span-12 lg:col-span-3">
            <Card>
              <div className="p-2">
                <button
                  onClick={() => setActiveTab('general')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'general'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Globe size={16} className="inline-block mr-2" />
                  Geral
                </button>

                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'appearance'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Moon size={16} className="inline-block mr-2" />
                  Aparência
                </button>

                <button
                  onClick={() => setActiveTab('contact')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'contact'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Globe size={16} className="inline-block mr-2" />
                  Contato
                </button>

                <button
                  onClick={() => setActiveTab('advanced')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'advanced'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Lock size={16} className="inline-block mr-2" />
                  Avançado
                </button>
              </div>
            </Card>
          </div>

          {/* Painéis de configuração */}
          <div className="col-span-12 lg:col-span-9">
            {activeTab === 'general' && (
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Configurações Gerais
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome do Site
                      </label>
                      <input
                        id="siteName"
                        name="siteName"
                        type="text"
                        value={settings.siteName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descrição do Site
                      </label>
                      <textarea
                        id="siteDescription"
                        name="siteDescription"
                        value={settings.siteDescription}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Essa descrição é usada em meta tags para SEO.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'appearance' && (
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Configurações de Aparência
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Tema do Dashboard */}
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <h4 className="text-md font-medium mb-4">Tema do Dashboard</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
                          <span className="text-sm">
                            O dashboard está usando o tema {theme === 'light' ? 'claro' : 'escuro'}
                          </span>
                        </div>
                        <button
                          onClick={handleDashboardThemeChange}
                          className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Alternar para {theme === 'light' ? 'escuro' : 'claro'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Tema Padrão do Site */}
                    <div>
                      <label htmlFor="defaultTheme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tema Padrão do Site
                      </label>
                      <div className="relative">
                        <select
                          id="defaultTheme"
                          name="defaultTheme"
                          value={settings.defaultTheme}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        >
                          <option value="light">Claro</option>
                          <option value="dark">Escuro</option>
                          <option value="system">Preferência do Sistema</option>
                        </select>
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                        {settings.defaultTheme === 'light' && <Sun size={16} className="text-yellow-500" />}
                        {settings.defaultTheme === 'dark' && <Moon size={16} className="text-blue-500" />}
                        {settings.defaultTheme === 'system' && <Monitor size={16} className="text-gray-500" />}
                        {settings.defaultTheme === 'light' && 'O site usará o tema claro por padrão para novos visitantes.'}
                        {settings.defaultTheme === 'dark' && 'O site usará o tema escuro por padrão para novos visitantes.'}
                        {settings.defaultTheme === 'system' && 'O site usará a preferência do sistema do visitante.'}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'contact' && (
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Informações de Contato
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email de Contato
                      </label>
                      <input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={settings.contactEmail}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Telefone de Contato
                      </label>
                      <input
                        id="contactPhone"
                        name="contactPhone"
                        type="text"
                        value={settings.contactPhone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    
                    <fieldset className="border border-gray-300 dark:border-gray-600 rounded-md p-4">
                      <legend className="text-sm font-medium px-2">Redes Sociais</legend>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="socialMedia.instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Instagram (URL)
                          </label>
                          <input
                            id="socialMedia.instagram"
                            name="socialMedia.instagram"
                            type="url"
                            value={settings.socialMedia.instagram}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            placeholder="https://instagram.com/seuusuario"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="socialMedia.facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Facebook (URL)
                          </label>
                          <input
                            id="socialMedia.facebook"
                            name="socialMedia.facebook"
                            type="url"
                            value={settings.socialMedia.facebook}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            placeholder="https://facebook.com/suapagina"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="socialMedia.whatsapp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            WhatsApp (número com DDD)
                          </label>
                          <input
                            id="socialMedia.whatsapp"
                            name="socialMedia.whatsapp"
                            type="text"
                            value={settings.socialMedia.whatsapp}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                            placeholder="4899999999"
                          />
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'advanced' && (
              <Card>
                <div className="p-6 space-y-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-amber-700 dark:text-amber-400">
                          Estas configurações avançadas podem afetar o funcionamento do site. Altere apenas se souber o que está fazendo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Configurações Avançadas
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="analyticsId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        ID do Google Analytics
                      </label>
                      <input
                        id="analyticsId"
                        name="analyticsId"
                        type="text"
                        value={settings.analyticsId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        placeholder="G-XXXXXXXX ou UA-XXXXXXXX-X"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Para rastrear visitantes no seu site. Deixe em branco para desativar o Analytics.
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="maintenanceMode"
                        name="maintenanceMode"
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => handleSiteModeChange(e.target.checked)}
                        className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      />
                      <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Modo de Manutenção
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Quando ativado, o site exibirá uma página de "Em Manutenção" para visitantes. Administradores ainda podem acessar o site.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}