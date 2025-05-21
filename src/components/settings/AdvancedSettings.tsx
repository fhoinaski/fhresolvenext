// src/components/settings/AdvancedSettings.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { SettingsData } from '@/types/settings';
import { motion } from 'framer-motion';
import { SaveButton } from './SaveButton';
import { useSettingsData } from '@/hooks/useSettingsData';

interface AdvancedSettingsProps {
  settings: SettingsData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function AdvancedSettings({ settings, handleChange }: AdvancedSettingsProps) {
  const { saveSettings, saving, saved } = useSettingsData();
  const inputVariants = {
    focus: { scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' },
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
          Configurações Avançadas
        </h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="tracking.facebookPixel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Facebook Pixel
            </label>
            <motion.input
              id="tracking.facebookPixel"
              name="tracking.facebookPixel"
              type="text"
              value={settings.tracking.facebookPixel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="tracking.tiktokPixel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              TikTok Pixel
            </label>
            <motion.input
              id="tracking.tiktokPixel"
              name="tracking.tiktokPixel"
              type="text"
              value={settings.tracking.tiktokPixel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="tracking.googleTagManager" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Google Tag Manager
            </label>
            <motion.input
              id="tracking.googleTagManager"
              name="tracking.googleTagManager"
              type="text"
              value={settings.tracking.googleTagManager}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
        </div>
        <SaveButton onSave={saveSettings} saving={saving} saved={saved} />
      </div>
    </Card>
  );
}