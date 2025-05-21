import React from 'react';
import { motion } from 'framer-motion';
import { Service, IconOption } from '@/types/settings';

interface ServiceEditorProps {
  services: Service[];
  updateService: (index: number, field: string, value: string) => void;
  iconOptions: IconOption[];
  variants?: any;
}

export const ServiceEditor: React.FC<ServiceEditorProps> = ({ 
  services, 
  updateService, 
  iconOptions,
  variants
}) => {
  return (
    <motion.div variants={variants}>
      <h4 className="text-md font-medium mb-4">Serviços</h4>
      <div className="space-y-6">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
            whileHover={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
          >
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 flex items-center justify-center mr-2 bg-accent/10 text-accent rounded-full">
                {iconOptions.find(opt => opt.name === service.icon)?.icon}
              </div>
              <h5 className="font-medium">Serviço {index + 1}</h5>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título
                </label>
                <motion.input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateService(index, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Ícone
                </label>
                <motion.select
                  value={service.icon}
                  onChange={(e) => updateService(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
                >
                  {iconOptions.map(opt => (
                    <option key={opt.name} value={opt.name}>{opt.name}</option>
                  ))}
                </motion.select>
              </div>
            </div>
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Descrição
              </label>
              <motion.input
                type="text"
                value={service.desc}
                onChange={(e) => updateService(index, 'desc', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};