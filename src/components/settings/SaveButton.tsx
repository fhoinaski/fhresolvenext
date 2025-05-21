import React from 'react';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SaveButtonProps {
  onClick: () => Promise<void>;
  disabled: boolean;
  saving: boolean;
  saved: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onClick, disabled, saving, saved }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {saving ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>Salvando...</span>
        </>
      ) : saved ? (
        <>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <CheckCircle size={16} />
          </motion.div>
          <span>Salvo!</span>
        </>
      ) : (
        <>
          <Save size={16} />
          <span>Salvar Alterações</span>
        </>
      )}
    </motion.button>
  );
};