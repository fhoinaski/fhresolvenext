// components/estimate-view/ItemsSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Estimate } from '@/types/estimate';
import { formatCurrency } from '@/app/utils/formatters';


interface ItemsSectionProps {
  estimate: Estimate;
}

export default function ItemsSection({ estimate }: ItemsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Itens do orçamento */}
      <motion.div 
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-medium mb-4 border-b pb-2 text-gray-800">Itens do Orçamento</h3>
        
        {estimate.estimateType === 'detailed' && estimate.items && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qtd
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Un
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço Unit.
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estimate.items.map((item, index) => (
                  <motion.tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <td className="px-4 py-4 text-sm text-gray-900">{item.description}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.quantity}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.unit}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(item.unitPrice)}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    Subtotal:
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(estimate.subtotal)}
                  </td>
                </tr>
                {estimate.discount && estimate.discount > 0 && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Desconto:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      -{formatCurrency(estimate.discount)}
                    </td>
                  </tr>
                )}
                {estimate.tax && estimate.tax > 0 && (
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Taxas/Adicionais:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      +{formatCurrency(estimate.tax)}
                    </td>
                  </tr>
                )}
                <tr className="bg-blue-50">
                  <td colSpan={4} className="px-4 py-4 text-base font-bold text-gray-900 text-right">
                    Total:
                  </td>
                  <td className="px-4 py-4 text-base font-bold text-blue-600 text-right">
                    {formatCurrency(estimate.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        
        {estimate.estimateType === 'simple' && estimate.services && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição do Serviço
                  </th>
                  <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estimate.services.map((service, index) => (
                  <motion.tr 
                    key={index} 
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <td className="px-4 py-4 text-sm text-gray-900">{service.description}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">{formatCurrency(service.value)}</td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    Subtotal:
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                    {formatCurrency(estimate.subtotal)}
                  </td>
                </tr>
                {estimate.discount && estimate.discount > 0 && (
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Desconto:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      -{formatCurrency(estimate.discount)}
                    </td>
                  </tr>
                )}
                {estimate.tax && estimate.tax > 0 && (
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      Taxas/Adicionais:
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                      +{formatCurrency(estimate.tax)}
                    </td>
                  </tr>
                )}
                <tr className="bg-blue-50">
                  <td className="px-4 py-4 text-base font-bold text-gray-900 text-right">
                    Total:
                  </td>
                  <td className="px-4 py-4 text-base font-bold text-blue-600 text-right">
                    {formatCurrency(estimate.total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
        
        {estimate.estimateType === 'materials' && (
          <>
            <div className="mb-6">
              <h4 className="text-base font-medium text-gray-800 mb-3 border-b pb-2">Materiais</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Qtd
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Un
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preço Unit.
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {estimate.materials?.map((item, index) => (
                      <motion.tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <td className="px-4 py-4 text-sm text-gray-900">{item.description}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{item.unit}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-right">{formatCurrency(item.unitPrice)}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">{formatCurrency(item.quantity * item.unitPrice)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        Subtotal de Materiais:
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(estimate.materials?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) || 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-base font-medium text-gray-800 mb-3 border-b pb-2">Serviços</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição do Serviço
                      </th>
                      <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {estimate.services?.map((service, index) => (
                      <motion.tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <td className="px-4 py-4 text-sm text-gray-900">{service.description}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 text-right font-medium">{formatCurrency(service.value)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        Subtotal de Serviços:
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                        {formatCurrency(estimate.services?.reduce((sum, service) => sum + service.value, 0) || 0)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <table className="min-w-full">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Subtotal:</td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right w-40">{formatCurrency(estimate.subtotal)}</td>
                  </tr>
                  {estimate.discount && estimate.discount > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Desconto:</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">-{formatCurrency(estimate.discount)}</td>
                    </tr>
                  )}
                  {estimate.tax && estimate.tax > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">Taxas/Adicionais:</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">+{formatCurrency(estimate.tax)}</td>
                    </tr>
                  )}
                  <tr className="bg-blue-50 rounded-lg">
                    <td className="px-4 py-3 text-base font-bold text-gray-900 text-right rounded-l-lg">Total:</td>
                    <td className="px-4 py-3 text-base font-bold text-blue-600 text-right rounded-r-lg">{formatCurrency(estimate.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}