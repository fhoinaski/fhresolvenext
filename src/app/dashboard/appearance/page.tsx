'use client';

import { useState, useEffect } from 'react';
import { Card, Heading } from '@/components/ui/Card';
import { Settings, Palette, Template, Globe, Save, Loader2, Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeEditor from '@/components/dashboard/ThemeEditor';
import { RoleGuard } from '@/components/RoleGuard';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { useFeedback } from '@/context/FeedbackContext';

export default function AppearancePage() {
  const { config, updateConfig, loading } = useSiteConfig();
  const { showToast } = useFeedback();
  
  const [activeTab, setActiveTab] = useState<'theme' | 'template' | 'general'>('theme');
  const [defaultTheme, setDefaultTheme] = useState<'light' | 'dark' | 'system'>(
    (config.defaultTheme as 'light' | 'dark' | 'system') || 'light'
  );
  const [templateSelection, setTemplateSelection] = useState(config.activeTemplate || 'default');
  const [siteName, setSiteName] = useState(config.siteName || 'FH Resolve');
  const [siteDescription, setSiteDescription] = useState(
    config.siteDescription || 'Serviços profissionais de manutenção residencial em Florianópolis'
  );
  const [saving, setSaving] = useState(false);

  // Atualizar estados quando as configurações carregarem
  useEffect(() => {
    if (!loading) {
      setDefaultTheme((config.defaultTheme as 'light' | 'dark' | 'system') || 'light');
      setTemplateSelection(config.activeTemplate || 'default');
      setSiteName(config.siteName || 'FH Resolve');
      setSiteDescription(config.siteDescription || 'Serviços profissionais de manutenção residencial em Florianópolis');
    }
  }, [config, loading]);

  // Salvar configurações gerais
  const saveGeneralSettings = async () => {
    setSaving(true);
    try {
      await updateConfig({
        defaultTheme,
        activeTemplate: templateSelection,
        siteName,
        siteDescription
      });
      showToast('Configurações de aparência salvas com sucesso', 'success');
    } catch (error) {
      console.error('Erro ao salvar configurações de aparência:', error);
      showToast('Erro ao salvar configurações', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Templates disponíveis
  const templates = [
    {
      id: 'default',
      name: 'Padrão',
      description: 'Layout padrão com header, seções principais e footer'
    },
    {
      id: 'minimal',
      name: 'Minimalista',
      description: 'Design minimalista com foco em conteúdo'
    },
    {
      id: 'corporate',
      name: 'Corporativo',
      description: 'Design profissional para empresas'
    },
  ];

  // Verificar se ainda está carregando
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]"></div>
      </div>
    );
  }

  return (
    <RoleGuard allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Heading
            title="Aparência"
            description="Personalize a aparência e o tema do seu site"
          />
          
          <motion.button
            onClick={saveGeneralSettings}
            disabled={saving}
            className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md flex items-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Salvando...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Salvar Alterações</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar de navegação */}
          <div className="col-span-12 lg:col-span-3">
            <Card>
              <div className="p-2">
                <button
                  onClick={() => setActiveTab('theme')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'theme'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Palette size={16} className="inline-block mr-2" />
                  Editor de Tema
                </button>

                <button
                  onClick={() => setActiveTab('template')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'template'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Template size={16} className="inline-block mr-2" />
                  Templates
                </button>

                <button
                  onClick={() => setActiveTab('general')}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === 'general'
                      ? 'bg-accent text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Settings size={16} className="inline-block mr-2" />
                  Configurações Gerais
                </button>
              </div>
            </Card>
          </div>

          {/* Painéis de configuração */}
          <div className="col-span-12 lg:col-span-9">
            {activeTab === 'theme' && (
              <ThemeEditor />
            )}
            
            {activeTab === 'template' && (
              <Card>
                <div className="p-6 space-y-6">
                  <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
                    Seleção de Template
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`border p-4 rounded-lg cursor-pointer ${
                          templateSelection === template.id
                            ? 'border-2 border-accent bg-accent/5'
                            : 'border-gray-200 dark:border-gray-700 hover:border-accent hover:bg-accent/5'
                        }`}
                        onClick={() => setTemplateSelection(template.id)}
                      >
                        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-md mb-3 flex items-center justify-center">
                          <Template size={32} className="text-gray-400" />
                        </div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {template.description}
                        </p>
                        {templateSelection === template.id && (
                          <div className="mt-2 text-xs bg-accent text-white py-1 px-2 rounded inline-block">
                            Selecionado
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border-l-4 border-blue-500">
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      O template selecionado define o layout e a estrutura geral do seu site.
                      Alterações nesta configuração afetam diretamente a aparência do site para todos os visitantes.
                    </p>
                  </div>
                </div>
              </Card>
            )}
            
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
                        type="text"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Descrição do Site
                      </label>
                      <textarea
                        id="siteDescription"
                        value={siteDescription}
                        onChange={(e) => setSiteDescription(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Esta descrição é usada para SEO e pode aparecer nos resultados de busca.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="defaultTheme" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tema Padrão do Site
                      </label>
                      <div className="grid grid-cols-3 gap-3 mt-2">
                        <div
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer border ${
                            defaultTheme === 'light'
                              ? 'border-accent bg-accent/5'
                              : 'border-gray-200 dark:border-gray-700 hover:border-accent hover:bg-accent/5'
                          }`}
                          onClick={() => setDefaultTheme('light')}
                        >
                          <Sun size={24} className="text-orange-400" />
                          <span className="text-sm font-medium">Claro</span>
                        </div>
                        
                        <div
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer border ${
                            defaultTheme === 'dark'
                              ? 'border-accent bg-accent/5'
                              : 'border-gray-200 dark:border-gray-700 hover:border-accent hover:bg-accent/5'
                          }`}
                          onClick={() => setDefaultTheme('dark')}
                        >
                          <Moon size={24} className="text-indigo-400" />
                          <span className="text-sm font-medium">Escuro</span>
                        </div>
                        
                        <div
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer border ${
                            defaultTheme === 'system'
                              ? 'border-accent bg-accent/5'
                              : 'border-gray-200 dark:border-gray-700 hover:border-accent hover:bg-accent/5'
                          }`}
                          onClick={() => setDefaultTheme('system')}
                        >
                          <Monitor size={24} className="text-gray-400" />
                          <span className="text-sm font-medium">Sistema</span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Define o tema padrão para novos visitantes. Os usuários ainda poderão alternar entre temas.
                      </p>
                    </div>
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