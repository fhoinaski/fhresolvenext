// components/estimate-view/DetailsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, CreditCard } from 'lucide-react';
import { Estimate } from '@/types/estimate';
import { formatDate } from '@/app/utils/formatters';


interface DetailsSectionProps {
  estimate: Estimate;
}

export default function DetailsSection({ estimate }: DetailsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Informações do cliente e do orçamento */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-white rounded-xl shadow-sm p-6 md:col-span-2">
          <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Dados do Cliente</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <motion.div 
              className="bg-gray-50 rounded-lg p-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-gray-500">Nome:</p>
              <p className="font-medium text-gray-900">{estimate.clientName}</p>
            </motion.div>
            <motion.div 
              className="bg-gray-50 rounded-lg p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-gray-500">Telefone:</p>
              <p className="font-medium text-gray-900">{estimate.clientPhone}</p>
            </motion.div>
            {estimate.clientEmail && (
              <motion.div 
                className="bg-gray-50 rounded-lg p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-sm text-gray-500">Email:</p>
                <p className="font-medium text-gray-900">{estimate.clientEmail}</p>
              </motion.div>
            )}
            {estimate.address && (
              <motion.div 
                className="bg-gray-50 rounded-lg p-4 sm:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm text-gray-500">Endereço:</p>
                <p className="font-medium text-gray-900">{estimate.address}</p>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Detalhes</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Data do Orçamento:</p>
                <p className="font-medium text-gray-900">{formatDate(estimate.createdAt)}</p>
              </div>
            </div>
            {estimate.validUntil && (
              <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Válido até:</p>
                  <p className="font-medium text-gray-900">{formatDate(estimate.validUntil)}</p>
                </div>
              </div>
            )}
            {estimate.paymentTerms && (
              <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                <CreditCard className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Condições de Pagamento:</p>
                  <p className="font-medium text-gray-900">{estimate.paymentTerms}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Descrição do orçamento */}
      {estimate.description && (
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Descrição</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{estimate.description}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}