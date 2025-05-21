// components/estimate-view/SummarySection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Estimate } from '@/types/estimate';
import { formatCurrency, formatDate } from '@/app/utils/formatters';


interface SummarySectionProps {
  estimate: Estimate;
  setActiveSection: (section: string) => void;
}

export default function SummarySection({ estimate, setActiveSection }: SummarySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Resumo do Orçamento</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-800 mb-2">Total do Orçamento</h4>
            <p className="text-2xl font-bold text-blue-700">{formatCurrency(estimate.total)}</p>
            {estimate.discount && estimate.discount > 0 && (
              <p className="text-xs text-blue-600 mt-1">Inclui desconto de {formatCurrency(estimate.discount)}</p>
            )}
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Cliente</h4>
            <p className="font-medium text-gray-900">{estimate.clientName}</p>
            <p className="text-sm text-gray-500 mt-1">{estimate.clientPhone}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Datas</h4>
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-500">Criado em:</p>
                <p className="font-medium text-gray-900">{formatDate(estimate.createdAt)}</p>
              </div>
              {estimate.validUntil && (
                <div>
                  <p className="text-xs text-gray-500">Válido até:</p>
                  <p className="font-medium text-gray-900">{formatDate(estimate.validUntil)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4">
          {estimate.description && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Descrição</h4>
              <p className="text-gray-700 whitespace-pre-line">{estimate.description}</p>
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Quick Overview of Items - Resumo dependendo do tipo de orçamento */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Itens do Orçamento</h3>
          <button 
            onClick={() => setActiveSection('items')}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            Ver detalhes <ArrowUpRight size={14} className="ml-1" />
          </button>
        </div>
        
        {/* Aqui renderiza uma versão condensada dos itens com base no tipo de orçamento */}
        {/* Implementação depende do tipo de orçamento (detailed, materials, simple) */}
        
        <div className="mt-4 border-t pt-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total:</span>
          <span className="text-lg font-bold text-blue-600">{formatCurrency(estimate.total)}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}