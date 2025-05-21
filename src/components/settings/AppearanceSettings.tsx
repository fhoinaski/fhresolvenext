import React from 'react';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { SettingsData, Style, IconOption } from '@/types/settings';
import { ServiceEditor } from './ServiceEditor';
import { TemplateEditor } from './TemplateEditor';

interface AppearanceSettingsProps {
  settings: SettingsData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  updateService: (index: number, field: string, value: string) => void;
  addTemplate: () => void;
  updateTemplateStyle: (index: number, key: string, value: string) => void;
  newTemplateName: string;
  setNewTemplateName: (name: string) => void;
  newTemplateStyles: { [key: string]: string };
  setNewTemplateStyles: (styles: { [key: string]: string }) => void;
  iconOptions: IconOption[];
}

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  settings,
  handleChange,
  updateService,
  addTemplate,
  updateTemplateStyle,
  newTemplateName,
  setNewTemplateName,
  newTemplateStyles,
  setNewTemplateStyles,
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
          <ServiceEditor
            services={settings.services}
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