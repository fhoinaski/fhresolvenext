// components/new-estimate/DetailedItemsTable.tsx
import { motion } from 'framer-motion';
import { Calculator, Plus, Trash2, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { EstimateFormValues, EstimateItem } from '@/types/estimate';

interface DetailedItemsTableProps {
  itemsFieldArray: UseFieldArrayReturn<EstimateFormValues, 'items', 'id'>;
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
  items: EstimateItem[];
  formatCurrency: (value: number) => string;
  calculateSubtotal: () => number;
  discount: number;
  tax: number;
  calculateTotal: () => number;
  isMobile: boolean;
}

export default function DetailedItemsTable({
  itemsFieldArray,
  register,
  errors,
  items,
  formatCurrency,
  calculateSubtotal,
  discount,
  tax,
  calculateTotal,
  isMobile
}: DetailedItemsTableProps) {
  const addItem = () => itemsFieldArray.append({ description: '', quantity: 1, unit: 'un', unitPrice: 0 });

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <h3 className="text-lg font-medium flex items-center gap-2 text-[var(--color-card-text)]">
            <Calculator size={18} className="text-[var(--color-accent)]" />
            Itens do Orçamento
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addItem}
            className="px-3 py-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md flex items-center gap-1 text-sm transition-colors"
          >
            <Plus size={16} /> Adicionar Item
          </motion.button>
        </div>
        {errors.items?.root && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded-md flex items-start gap-2">
            <span className="mt-0.5"><X size={16} /></span>
            <p>{errors.items.root.message}</p>
          </div>
        )}
        
        {isMobile ? (
          <div className="space-y-4">
            {itemsFieldArray.fields.map((field, index) => (
              <div key={field.id} className="border border-[var(--color-neutral)]/30 rounded-lg p-3 bg-[var(--color-neutral)]/5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-[var(--color-card-text)]">Item {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => itemsFieldArray.remove(index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    disabled={itemsFieldArray.fields.length === 1}
                    aria-label="Remover item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Descrição</label>
                    <input
                      {...register(`items.${index}.description`)}
                      className={`w-full px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                        errors.items?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                      }`}
                      placeholder="Descrição do item"
                    />
                    {errors.items?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-500">{errors.items[index]?.description?.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Quantidade</label>
                      <input
                        type="number"
                        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                        className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.quantity ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                        }`}
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Unidade</label>
                      <input
                        {...register(`items.${index}.unit`)}
                        className="w-full px-2 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                        placeholder="un"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Preço Un.</label>
                      <input
                        type="number"
                        {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                        className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.unitPrice ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--color-neutral)]/20">
                    <span className="text-xs font-medium text-[var(--color-card-text)] opacity-80">Total do item:</span>
                    <span className="text-sm font-semibold text-[var(--color-accent)]">
                      {formatCurrency((items[index]?.quantity || 0) * (items[index]?.unitPrice || 0))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-[var(--color-neutral)]/20">
              <thead>
                <tr className="bg-[var(--color-neutral)]/5">
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider">Descrição</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-20">Qtd</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-20">Un</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-32">Preço Un</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-32">Total</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[var(--color-card-text)] opacity-70 uppercase tracking-wider w-12">
                    <span className="sr-only">Ações</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-neutral)]/20">
                {itemsFieldArray.fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-[var(--color-neutral)]/5">
                    <td className="px-3 py-2">
                      <input
                        {...register(`items.${index}.description`)}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        placeholder="Descrição do item"
                      />
                      {errors.items?.[index]?.description && (
                        <p className="mt-1 text-xs text-red-500">{errors.items[index]?.description?.message}</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.quantity ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0.01"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        {...register(`items.${index}.unit`)}
                        className="w-full px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                        placeholder="un"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`items.${index}.unitPrice`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.items?.[index]?.unitPrice ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2 text-right text-sm font-medium text-[var(--color-card-text)]">
                      {formatCurrency((items[index]?.quantity || 0) * (items[index]?.unitPrice || 0))}
                    </td>
                    <td className="px-3 py-2">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => itemsFieldArray.remove(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        disabled={itemsFieldArray.fields.length === 1}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td colSpan={4} className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">{formatCurrency(calculateSubtotal())}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Desconto:</td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      {...register('discount', { valueAsNumber: true })}
                      className="w-full px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-3 py-3 text-right text-sm text-[var(--color-card-text)] opacity-80">-{formatCurrency(discount)}</td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Taxas/Adicionais:</td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      {...register('tax', { valueAsNumber: true })}
                      className="w-full px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-3 py-3 text-right text-sm text-[var(--color-card-text)] opacity-80">+{formatCurrency(tax)}</td>
                  <td></td>
                </tr>
                <tr className="bg-[var(--color-neutral)]/10">
                  <td colSpan={4} className="px-3 py-4 text-right font-bold text-base text-[var(--color-card-text)]">Total:</td>
                  <td className="px-3 py-4 text-right font-bold text-base text-[var(--color-accent)]">{formatCurrency(calculateTotal())}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}