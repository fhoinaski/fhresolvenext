// components/new-estimate/ServicesTable.tsx
import { motion } from 'framer-motion';
import { List, Plus, Trash2, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { EstimateFormValues, ServiceItem } from '@/types/estimate';

interface ServicesTableProps {
  servicesFieldArray: UseFieldArrayReturn<EstimateFormValues, 'services', 'id'>;
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
  services: ServiceItem[];
  formatCurrency: (value: number) => string;
  calculateServicesSubtotal: () => number;
  isMobile: boolean;
  isSimpleEstimate?: boolean;
  calculateSubtotal?: () => number;
  discount?: number;
  tax?: number;
  calculateTotal?: () => number;
}

export default function ServicesTable({
  servicesFieldArray,
  register,
  errors,
  services,
  formatCurrency,
  calculateServicesSubtotal,
  isMobile,
  isSimpleEstimate = false,
  calculateSubtotal,
  discount = 0,
  tax = 0,
  calculateTotal
}: ServicesTableProps) {
  const addService = () => servicesFieldArray.append({ description: '', value: 0 });

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <h3 className="text-lg font-medium flex items-center gap-2 text-[var(--color-card-text)]">
            <List size={18} className="text-[var(--color-accent)]" />
            Serviços
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addService}
            className="px-3 py-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md flex items-center gap-1 text-sm transition-colors"
          >
            <Plus size={16} /> Adicionar Serviço
          </motion.button>
        </div>
        {errors.services?.root && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded-md flex items-start gap-2">
            <span className="mt-0.5"><X size={16} /></span>
            <p>{errors.services.root.message}</p>
          </div>
        )}
        
        {isMobile ? (
          <div className="space-y-4">
            {servicesFieldArray.fields.map((field, index) => (
              <div key={field.id} className="border border-[var(--color-neutral)]/30 rounded-lg p-3 bg-[var(--color-neutral)]/5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-[var(--color-card-text)]">Serviço {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => servicesFieldArray.remove(index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    disabled={servicesFieldArray.fields.length === 1}
                    aria-label="Remover serviço"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Descrição</label>
                    <input
                      {...register(`services.${index}.description`)}
                      className={`w-full px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                        errors.services?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                      }`}
                      placeholder="Descrição do serviço"
                    />
                    {errors.services?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-500">{errors.services[index]?.description?.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Valor</label>
                    <input
                      type="number"
                      {...register(`services.${index}.value`, { valueAsNumber: true })}
                      className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                        errors.services?.[index]?.value ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                      }`}
                      min="0"
                      step="0.01"
                    />
                    {errors.services?.[index]?.value && (
                      <p className="mt-1 text-xs text-red-500">{errors.services[index]?.value?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-[var(--color-neutral)]/20">
              <thead>
                <tr className="bg-[var(--color-neutral)]/5">
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider">Descrição do Serviço</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-40">Valor</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-12">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral)]/20">
                {servicesFieldArray.fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-[var(--color-neutral)]/5">
                    <td className="px-3 py-2">
                      <input
                        {...register(`services.${index}.description`)}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.services?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        placeholder="Descrição do serviço"
                      />
                      {errors.services?.[index]?.description && (
                        <p className="mt-1 text-xs text-red-500">{errors.services[index]?.description?.message}</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`services.${index}.value`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.services?.[index]?.value ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => servicesFieldArray.remove(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        disabled={servicesFieldArray.fields.length === 1}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">
                    {isSimpleEstimate ? 'Subtotal:' : 'Subtotal de Serviços:'}
                  </td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">
                    {formatCurrency(isSimpleEstimate && calculateSubtotal ? calculateSubtotal() : calculateServicesSubtotal())}
                  </td>
                  <td></td>
                </tr>

                {isSimpleEstimate && calculateSubtotal && calculateTotal && (
                  <>
                    <tr>
                      <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Desconto:</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <input
                            type="number"
                            {...register('discount', { valueAsNumber: true })}
                            className="w-32 px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                            min="0"
                            step="0.01"
                          />
                          <span className="text-sm text-[var(--color-card-text)] opacity-80 w-24 text-right">
                            -{formatCurrency(discount)}
                          </span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-end gap-3">
                          <input
                            type="number"
                            {...register('tax', { valueAsNumber: true })}
                            className="w-32 px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                            min="0"
                            step="0.01"
                          />
                          <span className="text-sm text-[var(--color-card-text)] opacity-80 w-24 text-right">
                            +{formatCurrency(tax)}
                          </span>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr className="bg-[var(--color-neutral)]/10">
                      <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-card-text)]">Total:</td>
                      <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</td>
                      <td></td>
                    </tr>
                  </>
                )}
              </tfoot>
            </table>
          </div>
        )}

        {isMobile && isSimpleEstimate && calculateSubtotal && calculateTotal && (
          <div className="bg-[var(--color-neutral)]/10 rounded-lg p-4 space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-[var(--color-card-text)]">Subtotal:</span>
              <span className="text-[var(--color-card-text)] font-medium">{formatCurrency(calculateSubtotal())}</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[var(--color-card-text)]">Desconto:</label>
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
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</label>
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
            <div className="flex justify-between items-center pt-3 border-t border-[var(--color-neutral)]/30">
              <span className="text-base font-bold text-[var(--color-card-text)]">Total:</span>
              <span className="text-lg font-bold text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}