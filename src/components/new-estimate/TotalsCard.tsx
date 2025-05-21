// components/new-estimate/TotalsCard.tsx
import { Calculator } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister } from 'react-hook-form';
import { EstimateFormValues } from '@/types/estimate';

interface TotalsCardProps {
  register: UseFormRegister<EstimateFormValues>;
  calculateMaterialsSubtotal: () => number;
  calculateServicesSubtotal: () => number;
  calculateSubtotal: () => number;
  discount: number;
  tax: number;
  calculateTotal: () => number;
  formatCurrency: (value: number) => string;
  isMobile: boolean;
}

export default function TotalsCard({
  register,
  calculateMaterialsSubtotal,
  calculateServicesSubtotal,
  calculateSubtotal,
  discount,
  tax,
  calculateTotal,
  formatCurrency,
  isMobile
}: TotalsCardProps) {
  return (
    <Card>
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2 text-[var(--color-card-text)]">
          <Calculator size={18} className="text-[var(--color-accent)]" />
          Totais do Orçamento
        </h3>
        
        {isMobile ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-[var(--color-neutral)]/5 rounded-md">
              <span className="font-medium text-[var(--color-card-text)]">Subtotal Materiais:</span>
              <span className="text-[var(--color-card-text)]">{formatCurrency(calculateMaterialsSubtotal())}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[var(--color-neutral)]/5 rounded-md">
              <span className="font-medium text-[var(--color-card-text)]">Subtotal Serviços:</span>
              <span className="text-[var(--color-card-text)]">{formatCurrency(calculateServicesSubtotal())}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[var(--color-neutral)]/5 rounded-md">
              <span className="font-medium text-[var(--color-card-text)]">Subtotal Geral:</span>
              <span className="text-[var(--color-card-text)]">{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-md">
              <label className="font-medium text-[var(--color-card-text)]">Desconto:</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  {...register('discount', { valueAsNumber: true })}
                  className="w-24 px-2 py-1 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                  min="0"
                  step="0.01"
                />
                <span className="text-[var(--color-card-text)] opacity-80 text-sm">-{formatCurrency(discount)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-md">
              <label className="font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  {...register('tax', { valueAsNumber: true })}
                  className="w-24 px-2 py-1 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                  min="0"
                  step="0.01"
                />
                <span className="text-[var(--color-card-text)] opacity-80 text-sm">+{formatCurrency(tax)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-[var(--color-neutral)]/10 rounded-md border-t border-[var(--color-neutral)]/30">
              <span className="text-base font-bold text-[var(--color-card-text)]">Total:</span>
              <span className="text-lg font-bold text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        ) : (
          <div>
            <table className="w-full min-w-full divide-y divide-[var(--color-neutral)]/20">
              <tbody>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal Materiais:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)] w-40">{formatCurrency(calculateMaterialsSubtotal())}</td>
                </tr>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal Serviços:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">{formatCurrency(calculateServicesSubtotal())}</td>
                </tr>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal Geral:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">{formatCurrency(calculateSubtotal())}</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Desconto:</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end items-center gap-3">
                      <input
                        type="number"
                        {...register('discount', { valueAsNumber: true })}
                        className="w-32 px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                        min="0"
                        step="0.01"
                      />
                      <span className="text-sm text-[var(--color-card-text)] opacity-80 w-24 text-right">-{formatCurrency(discount)}</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</td>
                  <td className="px-3 py-3">
                    <div className="flex justify-end items-center gap-3">
                      <input
                        type="number"
                        {...register('tax', { valueAsNumber: true })}
                        className="w-32 px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                        min="0"
                        step="0.01"
                      />
                      <span className="text-sm text-[var(--color-card-text)] opacity-80 w-24 text-right">+{formatCurrency(tax)}</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-[var(--color-neutral)]/10">
                  <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-card-text)]">Total:</td>
                  <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}
