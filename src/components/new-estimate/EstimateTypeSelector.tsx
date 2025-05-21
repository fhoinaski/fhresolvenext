// components/new-estimate/EstimateTypeSelector.js
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface EstimateFormValues {
  estimateType: string;
}

export default function EstimateTypeSelector({ 
  register, 
  estimateType, 
  setValue 
}: { 
  register: UseFormRegister<EstimateFormValues>;
  estimateType: string;
  setValue: UseFormSetValue<EstimateFormValues>;
}) {
  const estimateTypes = [
    {
      id: 'detailed',
      title: 'Orçamento Detalhado',
      description: 'Lista detalhada com todos os itens, quantidades e valores unitários.'
    },
    {
      id: 'materials',
      title: 'Materiais e Serviços',
      description: 'Separa os materiais dos serviços com subtotais para cada categoria.'
    },
    {
      id: 'simple',
      title: 'Orçamento Simplificado',
      description: 'Lista apenas os serviços e seus valores, sem detalhes de materiais.'
    }
  ];

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <FileText size={18} className="text-[var(--color-accent)]" />
          Tipo de Orçamento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {estimateTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                estimateType === type.id 
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' 
                  : 'border-[var(--color-neutral)]/30 hover:border-[var(--color-accent)]/50'
              }`}
              onClick={() => setValue('estimateType', type.id)}
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  id={`type-${type.id}`}
                  value={type.id}
                  checked={estimateType === type.id}
                  {...register('estimateType')}
                  className="h-4 w-4 text-[var(--color-accent)]"
                />
                <label htmlFor={`type-${type.id}`} className="font-medium text-[var(--color-card-text)]">
                  {type.title}
                </label>
              </div>
              <p className="text-sm text-[var(--color-card-text)] opacity-70">
                {type.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}