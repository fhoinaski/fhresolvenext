// components/estimate-view/EstimateHeader.tsx
'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { Estimate } from '@/types/estimate';

interface EstimateHeaderProps {
  estimate: Estimate;
  statusUpdate: 'accepted' | 'rejected' | null;
  setStatusUpdate: (status: 'accepted' | 'rejected' | null) => void;
  setShowModal: (show: boolean) => void;
}

export default function EstimateHeader({
  estimate,
  statusUpdate,
  setStatusUpdate,
  setShowModal
}: EstimateHeaderProps) {
  const getStatusBadge = () => {
    const statusConfig = {
      draft: { label: 'Rascunho', color: 'bg-gray-200 text-gray-800' },
      sent: { label: 'Enviado', color: 'bg-blue-100 text-blue-800' },
      accepted: { label: 'Aceito', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'Recusado', color: 'bg-red-100 text-red-800' },
      expired: { label: 'Expirado', color: 'bg-yellow-100 text-yellow-800' },
    };
    
    return (
      <motion.span 
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[estimate.status].color}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {statusConfig[estimate.status].label}
      </motion.span>
    );
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm p-6 mb-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent pointer-events-none" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
        <div>
          <motion.h2 
            className="text-xl font-bold mb-2 text-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {estimate.title}
          </motion.h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500">Status:</p>
            {getStatusBadge()}
          </div>
        </div>
        {(estimate.status === 'sent' || estimate.status === 'draft') && (
          <motion.div 
            className="flex gap-2 w-full sm:w-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setStatusUpdate('accepted');
                setShowModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md shadow hover:from-green-600 hover:to-green-700 transition-all flex-1 sm:flex-none flex items-center justify-center gap-1"
            >
              <CheckCircle size={16} />
              Aceitar
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setStatusUpdate('rejected');
                setShowModal(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md shadow hover:from-red-600 hover:to-red-700 transition-all flex-1 sm:flex-none flex items-center justify-center gap-1"
            >
              <XCircle size={16} />
              Recusar
            </motion.button>
          </motion.div>
        )}
        {estimate.status === 'accepted' && (
          <motion.div 
            className="bg-green-50 border-l-4 border-green-500 p-4 w-full sm:w-auto rounded-r-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Orçamento aceito! Entraremos em contato em breve.
                </p>
              </div>
            </div>
          </motion.div>
        )}
        {estimate.status === 'rejected' && (
          <motion.div 
            className="bg-red-50 border-l-4 border-red-500 p-4 w-full sm:w-auto rounded-r-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Orçamento recusado.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}