// src/components/settings/ContactSettings.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { SettingsData } from '@/types/settings';
import { motion } from 'framer-motion';

interface ContactSettingsProps {
  settings: SettingsData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function ContactSettings({ settings, handleChange }: ContactSettingsProps) {
  const inputVariants = {
    focus: { scale: 1.01, boxShadow: '0 0 0 2px rgba(43, 141, 154, 0.3)' },
  };

  return (
    <Card>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-medium border-b border-gray-200 dark:border-gray-700 pb-2">
          Configurações de Contato
        </h3>
        <div className="space-y-5">
          <div>
            <label htmlFor="contactInfo.email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <motion.input
              id="contactInfo.email"
              name="contactInfo.email"
              type="email"
              value={settings.contactInfo.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="contactInfo.phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Telefone
            </label>
            <motion.input
              id="contactInfo.phone"
              name="contactInfo.phone"
              type="text"
              value={settings.contactInfo.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
          <div>
            <label htmlFor="contactInfo.address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Endereço
            </label>
            <motion.input
              id="contactInfo.address"
              name="contactInfo.address"
              type="text"
              value={settings.contactInfo.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white transition-all duration-200"
              whileFocus="focus"
              variants={inputVariants}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}