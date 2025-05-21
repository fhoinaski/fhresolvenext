// components/estimate-view/FeedbackModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface FeedbackModalProps {
  showFeedbackModal: boolean;
  feedback: string;
  setFeedback: (feedback: string) => void;
  submittingFeedback: boolean;
  submitFeedback: () => Promise<void>;
  setShowFeedbackModal: (show: boolean) => void;
  statusUpdate: 'accepted' | 'rejected' | null;
}

export default function FeedbackModal({
  showFeedbackModal,
  feedback,
  setFeedback,
  submittingFeedback,
  submitFeedback,
  setShowFeedbackModal,
  statusUpdate
}: FeedbackModalProps) {
  return (
    <AnimatePresence>
      {showFeedbackModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-blue-50 pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Seu feedback é importante!</h3>
              <p className="text-gray-500 mb-4">
                {statusUpdate === 'accepted' 
                  ? 'Obrigado por aceitar o orçamento. Gostaria de deixar algum comentário ou observação adicional?'
                  : 'Gostaríamos de entender melhor por que este orçamento não atendeu às suas expectativas.'}
              </p>
              
              <div className="mb-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Seu feedback aqui..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                />
              </div>
              
              <div className="flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50"
                >
                  Pular
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={submitFeedback}
                  disabled={!feedback.trim() || submittingFeedback}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 flex items-center gap-2"
                >
                  {submittingFeedback ? (
                    <>
                      <motion.div 
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                                     <MessageSquare size={16} />
                      Enviar Feedback
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}