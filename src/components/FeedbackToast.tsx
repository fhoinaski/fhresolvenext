'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FeedbackToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
}

const FeedbackToast: React.FC<FeedbackToastProps> = ({ message, type, isVisible, onClose }) => {
  const bgColor =
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-4 right-4 p-4 rounded-lg text-white ${bgColor} shadow-lg`}
      onClick={onClose}
    >
      {message}
    </motion.div>
  );
};

export default FeedbackToast; // Exportação padrão