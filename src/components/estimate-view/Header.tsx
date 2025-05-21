// components/estimate-view/Header.tsx
'use client';

import { motion } from 'framer-motion';
import { History, Share2, Download, X } from 'lucide-react';

interface HeaderProps {
  wasModified: boolean;
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  setShowShareModal: (show: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  scrollProgress: number;
}

export default function Header({
  wasModified,
  showHistory,
  setShowHistory,
  setShowShareModal,
  activeSection,
  setActiveSection,
  scrollProgress
}: HeaderProps) {
  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <motion.div 
          className="h-full bg-blue-500"
          style={{ scaleX: scrollProgress, transformOrigin: "0% 50%" }}
        />
      </div>
      
      <motion.header 
        className="sticky top-0 bg-white shadow-md z-40 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="flex items-center">
            <motion.div 
              className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              FH
            </motion.div>
            <div className="ml-3">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">FH Resolve</h1>
              <p className="text-sm text-gray-500">Orçamento Personalizado</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {wasModified && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-full ${showHistory ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-blue-500 hover:bg-gray-100'}`}
                aria-label="Histórico de modificações"
              >
                <History size={18} />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowShareModal(true)}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
              aria-label="Compartilhar"
            >
              <Share2 size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.print()}
              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
              aria-label="Imprimir/Baixar"
            >
              <Download size={18} />
            </motion.button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t">
          <nav className="flex overflow-x-auto scrollbar-hide">
            {['summary', 'details', 'items', 'notes'].map((section) => (
              <motion.button
                key={section}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === section 
                    ? 'text-blue-600 border-b-2 border-blue-500' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
                }`}
                onClick={() => setActiveSection(section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section === 'summary' && 'Resumo'}
                {section === 'details' && 'Detalhes do Cliente'}
                {section === 'items' && 'Itens do Orçamento'}
                {section === 'notes' && 'Observações'}
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.header>
    </>
  );
}