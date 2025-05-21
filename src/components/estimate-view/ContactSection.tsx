// components/estimate-view/ContactSection.tsx
'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <motion.div 
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-4 text-blue-800 border-b border-blue-200 pb-2">Entre em contato</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div 
          className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-sm text-blue-800 font-medium">Telefone:</p>
          <p className="font-bold text-blue-900">(48) 99191-9791</p>
        </motion.div>
        <motion.div 
          className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-sm text-blue-800 font-medium">Email:</p>
          <p className="font-bold text-blue-900">contato@fhresolve.com.br</p>
        </motion.div>
        <motion.div 
          className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-sm"
          whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)" }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <p className="text-sm text-blue-800 font-medium">Endereço:</p>
          <p className="font-bold text-blue-900">Ratones, Florianópolis - SC</p>
        </motion.div>
      </div>
    </motion.div>
  );
}