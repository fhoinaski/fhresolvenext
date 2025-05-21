// components/new-estimate/ActionButtons.tsx
import { motion } from 'framer-motion';
import { Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface ActionButtonsProps {
  router: AppRouterInstance;
  isSubmitting: boolean;
  onSaveClick: () => void; // Nova prop para lidar diretamente com o salvar
}

export default function ActionButtons({ router, isSubmitting, onSaveClick }: ActionButtonsProps) {
  console.log("Renderizando ActionButtons, isSubmitting:", isSubmitting);
  
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={() => {
          console.log("Botão Cancelar clicado");
          router.back();
        }}
        className="flex-1 px-4 py-2.5 border border-[var(--color-neutral)]/30 text-[var(--color-card-text)] rounded-md hover:bg-[var(--color-neutral)]/10 transition-colors"
      >
        Cancelar
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="button" // Mudamos para button em vez de submit
        onClick={() => {
          console.log("Botão Salvar clicado");
          onSaveClick(); // Chamamos a função diretamente
        }}
        disabled={isSubmitting}
        className="flex-1 px-4 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Salvando...
          </>
        ) : (
          <>
            <Save className="h-5 w-5" />
            Salvar
          </>
        )}
      </motion.button>
    </div>
  );
}