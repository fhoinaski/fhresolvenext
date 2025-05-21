// components/new-estimate/MaterialsTable.tsx
import { motion } from 'framer-motion';
import { PackageOpen, Plus, Trash2, X } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { UseFormRegister, FieldErrors, UseFieldArrayReturn } from 'react-hook-form';
import { EstimateFormValues, MaterialItem } from '@/types/estimate';

interface MaterialsTableProps {
  materialsFieldArray: UseFieldArrayReturn<EstimateFormValues, 'materials', 'id'>;
  register: UseFormRegister<EstimateFormValues>;
  errors: FieldErrors<EstimateFormValues>;
  materials: MaterialItem[];
  formatCurrency: (value: number) => string;
  calculateMaterialsSubtotal: () => number;
  isMobile: boolean;
}

export default function MaterialsTable({
  materialsFieldArray,
  register,
  errors,
  materials,
  formatCurrency,
  calculateMaterialsSubtotal,
  isMobile
}: MaterialsTableProps) {
  const addMaterial = () => materialsFieldArray.append({ description: '', quantity: 1, unit: 'un', unitPrice: 0 });

  return (
    <Card>
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <h3 className="text-lg font-medium flex items-center gap-2 text-[var(--color-card-text)]">
            <PackageOpen size={18} className="text-[var(--color-accent)]" />
            Materiais
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={addMaterial}
            className="px-3 py-1.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white rounded-md flex items-center gap-1 text-sm transition-colors"
          >
            <Plus size={16} /> Adicionar Material
          </motion.button>
        </div>
        {errors.materials?.root && (
          <div className="mb-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 p-2 rounded-md flex items-start gap-2">
            <span className="mt-0.5"><X size={16} /></span>
            <p>{errors.materials.root.message}</p>
          </div>
        )}
        
        {isMobile ? (
          <div className="space-y-4">
            {materialsFieldArray.fields.map((field, index) => (
              <div key={field.id} className="border border-[var(--color-neutral)]/30 rounded-lg p-3 bg-[var(--color-neutral)]/5">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-sm font-medium text-[var(--color-card-text)]">Material {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => materialsFieldArray.remove(index)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                    disabled={materialsFieldArray.fields.length === 1}
                    aria-label="Remover material"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Descrição</label>
                    <input
                      {...register(`materials.${index}.description`)}
                      className={`w-full px-3 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                        errors.materials?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                      }`}
                      placeholder="Descrição do material"
                    />
                    {errors.materials?.[index]?.description && (
                      <p className="mt-1 text-xs text-red-500">{errors.materials[index]?.description?.message}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Quantidade</label>
                      <input
                        type="number"
                        {...register(`materials.${index}.quantity`, { valueAsNumber: true })}
                        className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.quantity ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                        }`}
                        min="0.01"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Unidade</label>
                      <input
                        {...register(`materials.${index}.unit`)}
                        className="w-full px-2 py-2 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm"
                        placeholder="un"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-card-text)] opacity-80 mb-1">Preço Un.</label>
                      <input
                        type="number"
                        {...register(`materials.${index}.unitPrice`, { valueAsNumber: true })}
                        className={`w-full px-2 py-2 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.unitPrice ? 'border-red-500' : 'border-[var(--color-neutral)]/30'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--color-neutral)]/20">
                    <span className="text-xs font-medium text-[var(--color-card-text)] opacity-80">Total do material:</span>
                    <span className="text-sm font-semibold text-[var(--color-accent)]">
                      {formatCurrency((materials[index]?.quantity || 0) * (materials[index]?.unitPrice || 0))}
                    </span>
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
                {materialsFieldArray.fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-[var(--color-neutral)]/5">
                    <td className="px-3 py-2">
                      <input
                        {...register(`materials.${index}.description`)}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.description ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        placeholder="Descrição do material"
                      />
                      {errors.materials?.[index]?.description && (
                        <p className="mt-1 text-xs text-red-500">{errors.materials[index]?.description?.message}</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`materials.${index}.quantity`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.quantity ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0.01"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        {...register(`materials.${index}.unit`)}
                        className="w-full px-2 py-1.5 border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50"
                        placeholder="un"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="number"
                        {...register(`materials.${index}.unitPrice`, { valueAsNumber: true })}
                        className={`w-full px-2 py-1.5 border rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)] text-sm ${
                          errors.materials?.[index]?.unitPrice ? 'border-red-500' : 'border-[var(--color-neutral)]/30 focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/50'
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </td>
                    <td className="px-3 py-2 text-right text-sm font-medium text-[var(--color-card-text)]">
                      {formatCurrency((materials[index]?.quantity || 0) * (materials[index]?.unitPrice || 0))}
                    </td>
                    <td className="px-3 py-2">
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={() => materialsFieldArray.remove(index)}
                        className="text-red-500 hover:text-red-700 focus:outline-none p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        disabled={materialsFieldArray.fields.length === 1}
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-[var(--color-neutral)]/5">
                  <td colSpan={4} className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">Subtotal de Materiais:</td>
                  <td className="px-3 py-3 text-right font-medium text-[var(--color-card-text)]">{formatCurrency(calculateMaterialsSubtotal())}</td>
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