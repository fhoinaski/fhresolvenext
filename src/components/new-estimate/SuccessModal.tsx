import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clipboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface SuccessModalProps {
  showLinkModal: boolean;
  generatedLink: string;
  linkCopied: boolean;
  copyToClipboard: () => void;
  router: AppRouterInstance;
}

export default function SuccessModal({
  showLinkModal,
  generatedLink,
  linkCopied,
  copyToClipboard,
  router
}: SuccessModalProps) {
  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { scale: 0.9, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div 
            className="bg-[var(--color-card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden mobile-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)]">
              <div className="p-5 bg-[var(--color-card-bg)] rounded-t-lg">
                <h2 className="text-xl font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Orçamento Criado com Sucesso
                </h2>
                <p className="text-[var(--color-card-text)] opacity-80 mb-4">
                  O orçamento foi criado e está pronto para ser compartilhado com o cliente.
                </p>
                <div className="mb-6">
                  <p className="text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-2">
                    Link do orçamento:
                  </p>
                  <div className="flex">
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      className="flex-grow px-3 py-2 border border-[var(--color-neutral)]/30 rounded-l-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyToClipboard}
                      className={`px-3 py-2 rounded-r-md flex items-center gap-1 transition-colors ${
                        linkCopied 
                          ? 'bg-green-500 text-white' 
                          : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white'
                      }`}
                      title="Copiar link"
                    >
                      {linkCopied ? (
                        <> 
                          <CheckCircle size={16} />
                          <span className="hidden sm:inline">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Clipboard size={16} />
                          <span className="hidden sm:inline">Copiar</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-3 mobile-modal-actions">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push('/dashboard/estimates')}
                    className="px-4 py-2 border border-[var(--color-neutral)]/30 text-[var(--color-card-text)] rounded-md hover:bg-[var(--color-neutral)]/10 transition-colors"
                  >
                    Ver Lista
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(`/orcamento/${generatedLink.split('/').pop()}`)}
                    className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md transition-colors"
                  >
                    Visualizar Orçamento
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}