'use client';

import { motion } from 'framer-motion';
import { BarChart3, Users, FileImage, Star, Calculator } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StatsProps {
  stats?: {
    visitors?: number;
    quotes?: number;
    projects?: number;
    reviews?: number;
    estimates?: number;
  }
}

export function Stats({ stats = {} }: StatsProps) {
  const statsData = [
    {
      icon: BarChart3,
      label: 'Visitantes',
      value: stats.visitors?.toString() || '0',
      subtext: 'Último mês',
      color: 'var(--color-accent)',
    },
    {
      icon: Users,
      label: 'Pedidos',
      value: stats.quotes?.toString() || '0',
      subtext: 'Último mês',
      color: 'var(--color-accent)',
    },
    {
      icon: Calculator,
      label: 'Orçamentos',
      value: stats.estimates?.toString() || '0',
      subtext: 'Total',
      color: 'var(--color-accent)',
    },
    {
      icon: FileImage,
      label: 'Projetos',
      value: stats.projects?.toString() || '0',
      subtext: 'Total',
      color: 'var(--color-accent)',
    },
    {
      icon: Star,
      label: 'Avaliações',
      value: stats.reviews?.toString() || '0',
      subtext: 'Média: 5/5',
      color: 'var(--color-accent)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {statsData.map((stat, index) => (
        <motion.div key={index} variants={itemVariants}>
          <Card className="bg-[var(--color-card-bg)] text-[var(--color-text)] border-[var(--color-neutral)]/30 shadow-[var(--shadow-md)]">
            <div className="flex items-center p-4">
              <div className="p-3 rounded-full bg-[var(--color-accent)]/20">
                <stat.icon size={24} style={{ color: 'var(--color-accent)' }} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium opacity-90">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-xs opacity-70">{stat.subtext}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}