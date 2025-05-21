// components/estimate-view/LoadingState.tsx
'use client';

import { motion } from 'framer-motion';

export default function LoadingState() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50"
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="h-16 w-16 rounded-full border-4 border-t-blue-500 border-transparent relative"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.p 
          className="text-gray-600 mt-4 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Carregando orçamento...
        </motion.p>
      </div>
    </motion.div>
  );
}