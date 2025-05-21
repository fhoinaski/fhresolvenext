'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { Service, Template } from '@/types/settings';
import { ServiceEditor } from '@/components/settings/ServiceEditor';
import { TemplateEditor } from '@/components/settings/TemplateEditor';

export default function AppearancePage() {
  const { config, updateConfig, loading } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<'template' | 'general'>('template');

 const tabs = [
  { id: 'template', label: 'Templates', icon: <span className="i-lucide-layout" /> },
  { id: 'general', label: 'Geral', icon: <span className="i-lucide-settings" /> },
];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    updateConfig({ [name]: value });
  };  const updateService = (index: number, field: string, value: string) => {
    const newServices = [...(config.services || [])];
    let currentService = newServices[index];
    
    if (!currentService) {
      currentService = {
        id: crypto.randomUUID(),
        name: '',
        description: '',
        icon: ''
      };
      newServices[index] = currentService;
    }
    
 // Validar se o field é uma propriedade válida do Service
if (field in currentService || field === 'title') {
  newServices[index] = { 
    ...currentService, 
    [field]: value,
    // Se o campo for 'title', atualize também o 'name' para manter compatibilidade
    ...(field === 'title' ? { name: value } : {})
  };
  updateConfig({ services: newServices });
}
  };
  const addTemplate = () => {
    const newTemplates = [...(config.templates || []), { 
      id: crypto.randomUUID(),
      name: 'Novo Template', 
      styles: {} 
    }];
    updateConfig({ templates: newTemplates });
  };

  const updateTemplateStyle = (index: number, key: string, value: string) => {
    const newTemplates = [...config.templates];
    newTemplates[index] = {
      ...newTemplates[index],
      styles: { ...newTemplates[index].styles, [key]: value },
    };
    updateConfig({ templates: newTemplates });
  };

  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateStyles, setNewTemplateStyles] = useState<{ [key: string]: string }>({});
const iconOptions = [
  { name: 'wrench', value: 'wrench', label: 'Chave Inglesa', icon: 'i-lucide-wrench' },
  { name: 'hammer', value: 'hammer', label: 'Martelo', icon: 'i-lucide-hammer' },
  { name: 'screwdriver', value: 'screwdriver', label: 'Chave de Fenda', icon: 'i-lucide-screwdriver' },
  { name: 'paint-roller', value: 'paint-roller', label: 'Rolo de Tinta', icon: 'i-lucide-paint-roller' },
  { name: 'brush', value: 'brush', label: 'Pincel', icon: 'i-lucide-brush' },
  { name: 'ruler', value: 'ruler', label: 'Régua', icon: 'i-lucide-ruler' },
  { name: 'tape-measure', value: 'tape-measure', label: 'Fita Métrica', icon: 'i-lucide-ruler-square' },
  { name: 'tool', value: 'tool', label: 'Ferramenta', icon: 'i-lucide-tool' },
];

 if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-accent)]" />
    </div>
  );
}

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'template' | 'general')}
                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-[var(--color-accent)] text-[var(--color-accent)]'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'template' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Configurações de Template
                </h2>
                <div className="space-y-4">
                  <TemplateEditor
                    templates={config.templates}
                    updateTemplateStyle={updateTemplateStyle}
                    addTemplate={addTemplate}
                    newTemplateName={newTemplateName}
                    setNewTemplateName={setNewTemplateName}
                    newTemplateStyles={newTemplateStyles}
                    setNewTemplateStyles={setNewTemplateStyles}
                    activeTemplate={config.activeTemplate}
                    handleChange={handleChange}
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Configurações Gerais
                </h2>
                <div className="space-y-4">
                  <ServiceEditor
                    services={config.services}
                    updateService={updateService}
                    iconOptions={iconOptions}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}