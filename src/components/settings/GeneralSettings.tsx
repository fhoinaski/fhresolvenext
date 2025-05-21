// src/components/settings/GeneralSettings.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { SettingsData } from '@/types/settings';
import { motion } from 'framer-motion';

interface GeneralSettingsProps {
  settings: SettingsData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function GeneralSettings({ settings, handleChange }: GeneralSettingsProps) {
  const inputVariants = {
    focus: { scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' },
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
          Configurações Gerais
        </h3>        <div className="space-y-5">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nome do Site
            </label>
            <motion.input
              id="siteName"
              name="siteName"
              type="text"
              value={settings.siteName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Descrição do Site
            </label>
            <motion.textarea
              id="siteDescription"
              name="siteDescription"
              value={settings.siteDescription}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Essa descrição é usada em meta tags para SEO.
            </p>
          </div>
          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL do Logo
            </label>
            <motion.input
              id="logoUrl"
              name="logoUrl"
              type="url"
              value={settings.logoUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
              placeholder="https://exemplo.com/logo.png"
            />
          </div>
          <div>
            <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL do Favicon
            </label>
            <motion.input
              id="faviconUrl"
              name="faviconUrl"
              type="url"
              value={settings.faviconUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
              placeholder="https://exemplo.com/favicon.ico"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}