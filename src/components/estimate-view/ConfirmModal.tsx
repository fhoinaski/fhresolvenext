// components/estimate-view/ConfirmModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface ConfirmModalProps {
  showModal: boolean;
  statusUpdate: 'accepted' | 'rejected' | null;
  updating: boolean;
  setShowModal: (show: boolean) => void;
  updateEstimateStatus: () => Promise<void>;
}

export default function ConfirmModal({
  showModal,
  statusUpdate,
  updating,
  setShowModal,
  updateEstimateStatus
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {showModal && (
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
            <div className="text-center relative z-10">
              {statusUpdate === 'accepted' ? (
                <>
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
                  >
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Aceitar Orçamento</h3>
                  <p className="text-gray-500 mb-6">
                    Ao aceitar este orçamento, você concorda com os termos, valores e condições descritos. Deseja prosseguir?
                  </p>
                </>
              ) : (
                <>
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.1 }}
                  >
                    <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">Recusar Orçamento</h3>
                  <p className="text-gray-500 mb-6">
                    Tem certeza que deseja recusar este orçamento? Esta ação não pode ser desfeita.
                  </p>
                </>
              )}
              
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white shadow-sm hover:shadow"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={updateEstimateStatus}
                  disabled={updating}
                  className={`px-4 py-2 rounded-md text-white shadow-sm ${
                    statusUpdate === 'accepted'
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  } flex items-center justify-center gap-2 min-w-[140px]`}
                >
                  {updating ? (
                    <>
                      <motion.div 
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      />
                      Processando...
                    </>
                  ) : (
                    <>
                      {statusUpdate === 'accepted' ? 'Confirmar Aceitação' : 'Confirmar Recusa'}
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