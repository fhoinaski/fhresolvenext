// components/new-estimate/AdditionalInfoCard.tsx
import { HelpCircle, Calendar, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister } from 'react-hook-form';
import { EstimateFormValues } from '@/types/estimate';

interface AdditionalInfoCardProps {
  register: UseFormRegister<EstimateFormValues>;
}

export default function AdditionalInfoCard({ register }: AdditionalInfoCardProps) {
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <HelpCircle size={18} className="text-[var(--color-accent)]" />
          Informações Adicionais
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="validUntil" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Válido até
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={16} className="text-[var(--color-secondary)]" />
              </div>
              <input
                id="validUntil"
                type="date"
                {...register('validUntil')}
                className="pl-10 w-full px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="paymentTerms" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Condições de Pagamento
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard size={16} className="text-[var(--color-secondary)]" />
              </div>
              <textarea
                id="paymentTerms"
                {...register('paymentTerms')}
                rows={3}
                className="pl-10 w-full px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              />
            </div>
          </div>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-[var(--color-card-text)] opacity-80 mb-1">
              Observações
            </label>
            <textarea
              id="notes"
              {...register('notes')}
              rows={4}
              className="w-full px-3 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
              placeholder="Informações adicionais sobre o orçamento"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}