// components/estimate-view/ShareModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Clipboard, CheckCircle } from 'lucide-react';

interface ShareModalProps {
  showShareModal: boolean;
  linkCopied: boolean;
  copyToClipboard: () => void;
  setShowShareModal: (show: boolean) => void;
}

export default function ShareModal({
  showShareModal,
  linkCopied,
  copyToClipboard,
  setShowShareModal
}: ShareModalProps) {
  return (
    <AnimatePresence>
      {showShareModal && (
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
              <h3 className="text-xl font-medium text-gray-900 mb-4">Compartilhar Orçamento</h3>
              <p className="text-gray-500 mb-4">
                Compartilhe este orçamento copiando o link abaixo:
              </p>
              
              <div className="flex mb-6">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md text-gray-900 text-sm bg-gray-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className={`px-4 py-2 ${linkCopied ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-r-md shadow-sm flex items-center gap-1`}
                >
                  {linkCopied ? (
                    <>
                      <CheckCircle size={16} />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Clipboard size={16} />
                      Copiar
                    </>
                  )}
                </motion.button>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Fechar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}