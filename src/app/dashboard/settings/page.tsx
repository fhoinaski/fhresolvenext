// src/app/dashboard/settings/page.tsx
'use client';

import { useState } from 'react';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import GeneralSettings from '@/components/settings/GeneralSettings';
import ContactSettings from '@/components/settings/ContactSettings';
import AdvancedSettings from '@/components/settings/AdvancedSettings';
import { useSettingsData } from '@/hooks/useSettingsData';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'advanced'>('general');
  const { settings, handleChange, loading } = useSettingsData();

  // Adicionar um fallback enquanto os dados estão carregando
  if (loading || !settings) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-gray)] dark:bg-[var(--color-dark)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-accent)]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--color-gray)] dark:bg-[var(--color-dark)]">
      <SettingsSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6">
        {activeTab === 'general' && <GeneralSettings settings={settings} handleChange={handleChange} />}
        {activeTab === 'contact' && <ContactSettings settings={settings} handleChange={handleChange} />}
        {activeTab === 'advanced' && <AdvancedSettings settings={settings} handleChange={handleChange} />}
      </div>
    </div>
  );
}