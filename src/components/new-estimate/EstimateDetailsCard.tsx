// components/new-estimate/EstimateDetailsCard.tsx
import { FileText, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { EstimateFormValues } from '@/types/estimate';

interface EstimateDetailsCardProps {
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
}

export default function EstimateDetailsCard({ register, errors }: EstimateDetailsCardProps) {
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <FileText size={18} className="text-[var(--color-accent)]" />
          Detalhes do Orçamento
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Título do Orçamento
            </label>
            <input
              id="title"
              {...register('title')}
              className={`w-full px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] ${
                errors.title ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
              }`}
              placeholder="Ex: Reforma do Banheiro"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <X size={14} /> {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Descrição (opcional)
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows={3}
              className="w-full px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              placeholder="Descrição detalhada do serviço a ser realizado"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}