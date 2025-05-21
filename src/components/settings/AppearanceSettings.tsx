import React, { useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { SettingsData, Style, IconOption } from '@/types/settings';
import { ColorPicker } from './ColorPicker';
import { ThemeSelector } from './ThemeSelector';
import { ServiceEditor } from './ServiceEditor';
import { TemplateEditor } from './TemplateEditor';

interface AppearanceSettingsProps {
  settings: SettingsData;
  theme: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleDashboardThemeChange: () => void;
  updateThemeField: (theme: 'light' | 'dark', field: string, value: string) => void;
  updateHeroStyle: (field: 'titleStyles' | 'subtitleStyles', index: number, styleField: keyof Style, value: any) => void;
  updateCtaStyle: (field: keyof Style, value: any) => void;
  updateService: (index: number, field: string, value: string) => void;
  addTemplate: () => void;
  updateTemplateStyle: (index: number, key: string, value: string) => void;
  newTemplateName: string;
  setNewTemplateName: (name: string) => void;
  newTemplateStyles: { [key: string]: string };
  setNewTemplateStyles: (styles: { [key: string]: string }) => void;
  titleParts: string[];
  subtitleParts: string[];
  iconOptions: IconOption[];
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  settings,
  theme,
  handleChange,
  handleDashboardThemeChange,
  updateThemeField,
  updateHeroStyle,
  updateCtaStyle,
  updateService,
  addTemplate,
  updateTemplateStyle,
  newTemplateName,
  setNewTemplateName,
  newTemplateStyles,
  setNewTemplateStyles,
  titleParts,
  subtitleParts,
  iconOptions,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  // Garantir que titleStyles seja um array, mesmo que vazio
  const safeTitleStyles = settings.content.hero.titleStyles || [];

  // Função para aplicar as cores ao DOM
  const applyThemeColors = (themeType: 'light' | 'dark') => {
    const root = document.documentElement;
    const themeColors = settings.themes[themeType];
    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  };

  // Atualizar as cores no DOM quando o tema atual mudar
  useEffect(() => {
    applyThemeColors(theme as 'light' | 'dark');
  }, [settings.themes.light, settings.themes.dark, theme]);

  // Sobrescrever updateThemeField para aplicar as mudanças imediatamente
  const handleUpdateThemeField = (themeType: 'light' | 'dark', field: string, value: string) => {
    updateThemeField(themeType, field, value);
    const root = document.documentElement;
    root.style.setProperty(`--color-${field}`, value);
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
          Configurações de Aparência
        </h3>
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            variants={itemVariants}
          >
            <h4 className="text-md font-medium mb-4">Tema do Dashboard</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {theme === 'light' ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-500" />}
                <span className="text-sm">
                  O dashboard está usando o tema {theme === 'light' ? 'claro' : 'escuro'}
                </span>
              </div>
              <motion.button
                onClick={handleDashboardThemeChange}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Alternar para {theme === 'light' ? 'escuro' : 'claro'}
              </motion.button>
            </div>
          </motion.div>

          <ThemeSelector
            defaultTheme={settings.defaultTheme}
            handleChange={handleChange}
            variants={itemVariants}
          />

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Tema Claro</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(settings.themes.light).map(([key, value], index) => (
                <ColorPicker
                  key={key}
                  label={key}
                  value={value}
                  onChange={(newValue) => handleUpdateThemeField('light', key, newValue)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Tema Escuro</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(settings.themes.dark).map(([key, value], index) => (
                <ColorPicker
                  key={key}
                  label={key}
                  value={value}
                  onChange={(newValue) => handleUpdateThemeField('dark', key, newValue)}
                  delay={index * 0.05}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Hero - Título</h4>
            <div className="space-y-4">
              {titleParts.map((part, index) => (
                <motion.div 
                  key={index} 
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estilo para "{part}":
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="color"
                      value={safeTitleStyles[index]?.color || '#000000'}
                      onChange={(e) => updateHeroStyle('titleStyles', index, 'color', e.target.value)}
                      className="w-10 h-10 rounded-md cursor-pointer"
                    />
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={safeTitleStyles[index]?.bold || false}
                        onChange={(e) => updateHeroStyle('titleStyles', index, 'bold', e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <span className="ml-2 font-bold">Negrito</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={safeTitleStyles[index]?.italic || false}
                        onChange={(e) => updateHeroStyle('titleStyles', index, 'italic', e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <span className="ml-2 italic">Itálico</span>
                    </label>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Hero - Subtítulo</h4>
            <div className="space-y-2">
              {subtitleParts.slice(0, 3).map((part, index) => (
                <motion.div 
                  key={index} 
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estilo para "{part + (index < 2 ? '...' : '')}":
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="color"
                      value={settings.content.hero.subtitleStyles[index]?.color || '#000000'}
                      onChange={(e) => updateHeroStyle('subtitleStyles', index, 'color', e.target.value)}
                      className="w-10 h-10 rounded-md cursor-pointer"
                    />
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.content.hero.subtitleStyles[index]?.bold || false}
                        onChange={(e) => updateHeroStyle('subtitleStyles', index, 'bold', e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <span className="ml-2 font-bold">Negrito</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.content.hero.subtitleStyles[index]?.italic || false}
                        onChange={(e) => updateHeroStyle('subtitleStyles', index, 'italic', e.target.checked)}
                        className="rounded border-gray-300 text-accent focus:ring-accent"
                      />
                      <span className="ml-2 italic">Itálico</span>
                    </label>
                  </div>
                </motion.div>
              ))}
              {subtitleParts.length > 3 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  + {subtitleParts.length - 3} palavras adicionais (configure as primeiras para definir o estilo geral)
                </p>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-md font-medium mb-4">Estilos do Hero - CTA</h4>
            <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="color"
                  value={settings.content.hero.ctaStyles?.color || '#FFFFFF'}
                  onChange={(e) => updateCtaStyle('color', e.target.value)}
                  className="w-10 h-10 rounded-md cursor-pointer"
                />
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.content.hero.ctaStyles?.bold || false}
                    onChange={(e) => updateCtaStyle('bold', e.target.checked)}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 font-bold">Negrito</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.content.hero.ctaStyles?.italic || false}
                    onChange={(e) => updateCtaStyle('italic', e.target.checked)}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="ml-2 italic">Itálico</span>
                </label>
              </div>
              <div className="mt-3 p-2 bg-accent rounded-md inline-block">
                <span style={{ 
                  color: settings.content.hero.ctaStyles?.color || '#FFFFFF',
                  fontWeight: settings.content.hero.ctaStyles?.bold ? 'bold' : 'normal',
                  fontStyle: settings.content.hero.ctaStyles?.italic ? 'italic' : 'normal'
                }}>
                  {settings.content.hero.ctaText}
                </span>
              </div>
            </div>
          </motion.div>

          <ServiceEditor
            services={settings.content.services}
            updateService={updateService}
            iconOptions={iconOptions}
            variants={itemVariants}
          />

          <TemplateEditor
            activeTemplate={settings.activeTemplate}
            templates={settings.templates}
            newTemplateName={newTemplateName}
            newTemplateStyles={newTemplateStyles}
            handleChange={handleChange}
            setNewTemplateName={setNewTemplateName}
            setNewTemplateStyles={setNewTemplateStyles}
            addTemplate={addTemplate}
            updateTemplateStyle={updateTemplateStyle}
            variants={itemVariants}
          />
        </motion.div>
      </div>
    </Card>
  );
};