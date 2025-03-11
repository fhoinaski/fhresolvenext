// src/components/dashboard/ThemeEditor.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { Card } from '@/components/ui/Card';
import { Sun, Moon, Undo, Palette, Check, Save, Loader2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useFeedback } from '@/context/FeedbackContext';

interface ColorConfig {
  name: string;
  key: string;
  description: string;
}

const colorConfigs: ColorConfig[] = [
  { name: 'Cor Principal', key: 'primary', description: 'Cor base para textos principais e fundos escuros' },
  { name: 'Cor de Destaque', key: 'accent', description: 'Cor principal de destaque usado para botões e links' },
  { name: 'Cor Secundária', key: 'secondary', description: 'Cor para elementos secundários e textos menos importantes' },
  { name: 'Cor Neutra', key: 'neutral', description: 'Cor para bordas e elementos de separação' },
  { name: 'Cor de Texto', key: 'text', description: 'Cor primária para textos' },
  { name: 'Texto Claro', key: 'textLight', description: 'Cor para textos sobre fundos escuros' },
  { name: 'Fundo Escuro', key: 'dark', description: 'Cor para fundos escuros' },
  { name: 'Fundo Claro', key: 'light', description: 'Cor para fundos claros' },
  { name: 'Fundo Cinza', key: 'gray', description: 'Cor para fundos alternados ou secundários' },
  { name: 'Fundo de Card', key: 'cardBg', description: 'Cor para o fundo de cards e painéis' },
  { name: 'Texto de Card', key: 'cardText', description: 'Cor para textos dentro de cards e painéis' },
  { name: 'Destaque Hover', key: 'accentDark', description: 'Versão mais escura da cor de destaque para efeitos hover' },
];

const ThemeEditor: React.FC = () => {
  const { config, updateConfig, loading } = useSiteConfig();
  const { theme } = useTheme();
  const { showToast } = useFeedback();
  
  const [editingTheme, setEditingTheme] = useState<'light' | 'dark'>('light');
  const [themeColors, setThemeColors] = useState(config.themes[editingTheme]);
  const [originalColors, setOriginalColors] = useState(config.themes[editingTheme]);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  
  // Atualiza os estados quando o tema ativo muda
  useEffect(() => {
    setThemeColors(config.themes[editingTheme]);
    setOriginalColors(config.themes[editingTheme]);
  }, [config.themes, editingTheme]);
  
  // Função para trocar entre edição de tema claro e escuro
  const toggleEditingTheme = () => {
    // Salva as alterações atuais antes de trocar
    const newThemes = {
      ...config.themes,
      [editingTheme]: themeColors
    };
    
    // Alterna para o outro tema
    setEditingTheme(editingTheme === 'light' ? 'dark' : 'light');
  };
  
  // Função para restaurar cores originais
  const resetColors = () => {
    setThemeColors(originalColors);
    showToast('Cores restauradas para o último salvamento', 'info');
  };
  
  // Função para atualizar uma cor específica
  const updateColor = (key: string, value: string) => {
    setThemeColors(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Função para aplicar as alterações
  const applyChanges = async () => {
    setSaving(true);
    try {
      // Atualiza apenas o tema que está sendo editado
      const newThemes = {
        ...config.themes,
        [editingTheme]: themeColors
      };
      
      await updateConfig({
        themes: newThemes
      });
      
      setOriginalColors(themeColors);
      showToast(`Tema ${editingTheme === 'light' ? 'claro' : 'escuro'} atualizado com sucesso`, 'success');
    } catch (error) {
      console.error('Erro ao salvar tema:', error);
      showToast('Erro ao salvar tema', 'error');
    } finally {
      setSaving(false);
    }
  };
  
  // Componente de seletor de cor individual
  const ColorPicker = ({ color, colorKey, name, description }: { color: string, colorKey: string, name: string, description: string }) => (
    <div className="p-4 bg-white/5 rounded-lg border border-[var(--color-neutral)]/20">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={`color-${colorKey}`} className="font-medium text-[var(--color-text)]">
          {name}
        </label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[var(--color-text)]/70">{color}</span>
          <div 
            className="w-6 h-6 rounded-full border border-[var(--color-neutral)]/40"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
      <p className="text-xs text-[var(--color-text)]/60 mb-2">{description}</p>
      <input
        id={`color-${colorKey}`}
        type="color"
        value={color}
        onChange={(e) => updateColor(colorKey, e.target.value)}
        className="w-full h-8 rounded cursor-pointer"
      />
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Editor de Tema</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Personalize as cores do tema {editingTheme === 'light' ? 'claro' : 'escuro'} do site
          </p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleEditingTheme}
            className="p-2 rounded-md bg-[var(--color-neutral)]/10 flex items-center gap-2"
          >
            {editingTheme === 'light' ? (
              <>
                <Moon size={18} className="text-[var(--color-accent)]" />
                <span>Editar Tema Escuro</span>
              </>
            ) : (
              <>
                <Sun size={18} className="text-[var(--color-accent)]" />
                <span>Editar Tema Claro</span>
              </>
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPreviewMode(!previewMode)}
            className="p-2 rounded-md bg-[var(--color-neutral)]/10 flex items-center gap-2"
          >
            <Palette size={18} className="text-[var(--color-accent)]" />
            <span>{previewMode ? 'Voltar para Edição' : 'Visualizar'}</span>
          </motion.button>
        </div>
      </div>
      
      {previewMode ? (
        <div className="space-y-8">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Visualização do Tema</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium mb-3">Elementos Básicos</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-1">Texto Principal</label>
                      <div className="p-2 rounded" style={{ color: themeColors.text, backgroundColor: themeColors.light }}>
                        Este é um exemplo de texto principal
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Texto Secundário</label>
                      <div className="p-2 rounded" style={{ color: themeColors.secondary, backgroundColor: themeColors.light }}>
                        Este é um exemplo de texto secundário
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Botão Primário</label>
                      <button 
                        className="px-4 py-2 rounded"
                        style={{ 
                          backgroundColor: themeColors.accent, 
                          color: themeColors.textLight,
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = themeColors.accentDark }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = themeColors.accent }}
                      >
                        Botão de Destaque
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Card</h4>
                  <div 
                    className="p-4 rounded-lg"
                    style={{ 
                      backgroundColor: themeColors.cardBg,
                      color: themeColors.cardText,
                      border: `1px solid ${themeColors.neutral}40`
                    }}
                  >
                    <h5 className="font-medium mb-2" style={{ color: themeColors.cardText }}>
                      Título do Card
                    </h5>
                    <p style={{ color: `${themeColors.cardText}99` }}>
                      Este é um exemplo de conteúdo dentro de um card com cores personalizadas.
                    </p>
                    <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${themeColors.neutral}30` }}>
                      <button
                        className="px-3 py-1 rounded text-sm"
                        style={{ 
                          backgroundColor: themeColors.accent, 
                          color: themeColors.textLight 
                        }}
                      >
                        Botão do Card
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetColors}
              className="px-4 py-2 bg-[var(--color-neutral)]/10 rounded-md flex items-center gap-2"
            >
              <Undo size={18} />
              <span>Restaurar</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={applyChanges}
              disabled={saving}
              className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Salvar Tema</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {colorConfigs.map(({ key, name, description }) => (
              <ColorPicker
                key={key}
                colorKey={key}
                color={themeColors[key]}
                name={name}
                description={description}
              />
            ))}
          </div>
          
          <div className="flex justify-end gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={resetColors}
              className="px-4 py-2 bg-[var(--color-neutral)]/10 rounded-md flex items-center gap-2"
            >
              <Undo size={18} />
              <span>Restaurar</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={applyChanges}
              disabled={saving}
              className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-md flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Salvando...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Salvar Tema</span>
                </>
              )}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeEditor;