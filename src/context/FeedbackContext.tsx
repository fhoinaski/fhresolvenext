'use client';

import FeedbackToast from '@/components/FeedbackToast';
import React, { createContext, useContext, useState } from 'react';


interface FeedbackContextType {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');

  const showToast = (msg: string, toastType: 'success' | 'error' | 'info') => {
    setMessage(msg);
    setType(toastType);
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000); // Fecha automaticamente após 3 segundos
  };

  return (
    <FeedbackContext.Provider value={{ showToast }}>
      {children}
      <FeedbackToast
        message={message}
        type={type}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};