// components/estimate-view/ErrorState.tsx
'use client';

import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4"
    >
      <motion.div 
        className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        </motion.div>
        <h2 className="text-xl font-semibold mb-2">Orçamento não encontrado</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <motion.a
          href="/"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Voltar para a página inicial
        </motion.a>
      </motion.div>
    </motion.div>
  );
}