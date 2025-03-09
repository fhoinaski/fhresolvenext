
// src/components/FeedbackToast.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface FeedbackToastProps {
  message: string;
  isVisible: boolean;
  type: ToastType;
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const FeedbackToast: React.FC<FeedbackToastProps> = ({
  message,
  isVisible,
  type,
  onClose,
  autoClose = true,
  duration = 3000,
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, duration);
    }
    return () => timer && clearTimeout(timer);
  }, [isVisible, autoClose, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/30 border-green-500';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/30 border-red-500';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-500';
      default:
        return 'bg-blue-50 dark:bg-blue-900/30 border-blue-500';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg
            ${getBackgroundColor()} border-l-4 flex items-center gap-3 max-w-md w-full`}
        >
          {getIcon()}
          <span className="text-[var(--color-text)]">{message}</span>
          <button
            onClick={onClose}
            className="ml-auto p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Fechar notificação"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackToast;