// components/new-estimate/PageHeader.tsx
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Heading } from '@/components/ui/Heading';
import { useRouter } from 'next/navigation';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface PageHeaderProps {
  router: AppRouterInstance;
}

export default function PageHeader({ router }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => router.back()}
        className="p-2 rounded-full bg-[var(--color-neutral)]/10 text-[var(--color-text)] hover:bg-[var(--color-neutral)]/20"
        aria-label="Voltar"
      >
        <ArrowLeft size={20} />
      </motion.button>
      <Heading title="Novo Orçamento" description="Crie um orçamento detalhado para seu cliente" />
    </div>
  );
}