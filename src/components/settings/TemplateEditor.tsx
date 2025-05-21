import React from 'react';
import { motion } from 'framer-motion';
import { Template } from '@/types/settings';
import { PlusCircle } from 'lucide-react';

interface TemplateEditorProps {
  activeTemplate: string;
  templates: Template[];
  newTemplateName: string;
  newTemplateStyles: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setNewTemplateName: (name: string) => void;
  setNewTemplateStyles: (styles: { [key: string]: string }) => void;
  addTemplate: () => void;
  updateTemplateStyle: (index: number, key: string, value: string) => void;
  variants?: any;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({
  activeTemplate,
  templates,
  newTemplateName,
  newTemplateStyles,
  handleChange,
  setNewTemplateName,
  setNewTemplateStyles,
  addTemplate,
  updateTemplateStyle,
  variants
}) => {
  return (
    <motion.div variants={variants}>
      <h4 className="text-md font-medium mb-4">Templates</h4>
      
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Template Ativo:
      </label>
      <motion.select
        name="activeTemplate"
        value={activeTemplate}
        onChange={handleChange}
        className="mb-6 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
        whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
      >
        {templates.map(template => (
          <option key={template.name} value={template.name}>{template.name}</option>
        ))}
      </motion.select>

      <div className="mb-8">
        <h5 className="text-sm font-medium mb-3">Templates Existentes</h5>
        <div className="space-y-4">
          {templates.map((template, index) => (
            <motion.div 
              key={template.name}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ 
                boxShadow: template.name === activeTemplate ? 
                  '0 0 0 2px rgba(43, 141, 154, 0.6)' : 
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <h6 className="font-medium flex items-center">
                  {template.name === activeTemplate && (
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  )}
                  {template.name}
                </h6>
                {template.name === activeTemplate && (
                  <span className="text-xs text-green-500 font-medium">Ativo</span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(template.styles).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">
                      {key}:
                    </label>
                    <motion.input
                      type="text"
                      value={value}
                      onChange={(e) => updateTemplateStyle(index, key, e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h5 className="text-sm font-medium mb-3 flex items-center">
          <PlusCircle size={16} className="mr-2 text-accent" />
          Adicionar Novo Template
        </h5>
        
        <div className="space-y-3">
          <motion.input
            type="text"
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            placeholder="Nome do Template"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Hero Background:
              </label>
              <motion.input
                type="text"
                value={newTemplateStyles['hero-bg']}
                onChange={(e) => setNewTemplateStyles({ ...newTemplateStyles, 'hero-bg': e.target.value })}
                placeholder="Ex.: bg-blue-500"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Tamanho do Texto:
              </label>
              <motion.input
                type="text"
                value={newTemplateStyles['text-size']}
                onChange={(e) => setNewTemplateStyles({ ...newTemplateStyles, 'text-size': e.target.value })}
                placeholder="Ex.: text-4xl"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
              />
            </div>
          </div>
          
          <motion.button
            type="button"
            onClick={addTemplate}
            disabled={!newTemplateName}
            className="mt-3 px-4 py-2 bg-accent text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Adicionar Template
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};