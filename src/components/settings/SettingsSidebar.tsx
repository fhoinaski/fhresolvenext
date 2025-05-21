// src/components/settings/SettingsSidebar.tsx
'use client';

import { useState } from 'react';
import { Settings, Mail, Shield } from 'lucide-react';

type SettingsTab = 'general' | 'contact' | 'advanced';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  setActiveTab: (tab: SettingsTab) => void;
}

export default function SettingsSidebar({ activeTab, setActiveTab }: SettingsSidebarProps) {
  const tabs = [
    { id: 'general' as SettingsTab, label: 'Geral', icon: <Settings size={20} /> },
    { id: 'contact' as SettingsTab, label: 'Contato', icon: <Mail size={20} /> },
    { id: 'advanced' as SettingsTab, label: 'Avançado', icon: <Shield size={20} /> },
  ];

  return (
    <div className="w-64 bg-[var(--color-card-bg)] p-4 border-r border-[var(--color-gray)]">
      <ul className="space-y-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center p-2 rounded-lg text-[var(--color-card-text)] ${
                activeTab === tab.id ? 'bg-[var(--color-accent)] text-white' : 'hover:bg-[var(--color-paralel)]'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}