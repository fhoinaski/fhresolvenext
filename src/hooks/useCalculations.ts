// hooks/useCalculations.ts
import { useMemo } from 'react';

import { EstimateItem, MaterialItem, ServiceItem } from '@/types/estimate';

// Definição do tipo EstimateType
type EstimateType = 'detailed' | 'materials' | 'simple';

export const useCalculations = (
  items: EstimateItem[], 
  materials: MaterialItem[], 
  services: ServiceItem[], 
  discount: number, 
  tax: number, 
  estimateType: EstimateType
) => {
  const calculateSubtotal = useMemo(() => {
    return () => {
      if (estimateType === 'detailed') {
        return items.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);
      } else if (estimateType === 'materials') {
        const materialTotal = materials.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);
        const serviceTotal = services.reduce((sum, service) => sum + (service.value || 0), 0);
        return materialTotal + serviceTotal;
      } else {
        return services.reduce((sum, service) => sum + (service.value || 0), 0);
      }
    };
  }, [items, materials, services, estimateType]);

  const calculateMaterialsSubtotal = useMemo(() => {
    return () => {
      return materials.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0);
    };
  }, [materials]);

  const calculateServicesSubtotal = useMemo(() => {
    return () => {
      return services.reduce((sum, service) => sum + (service.value || 0), 0);
    };
  }, [services]);

  /**
   * Calcula o valor total do orçamento considerando o subtotal, descontos e impostos.
   * 
   * @returns {number} O valor total calculado do orçamento em reais.
   * 
   * @remarks
   * Esta função utiliza os seguintes parâmetros implícitos do hook:
   * - calculateSubtotal(): Função que calcula o subtotal dos itens baseado no tipo de orçamento.
   * - discount: Valor do desconto aplicado ao orçamento (em reais).
   * - tax: Valor de impostos ou taxas adicionais aplicados ao orçamento (em reais).
   * 
   * O cálculo é realizado da seguinte forma:
   * 1. Obtém o subtotal através da função calculateSubtotal()
   * 2. Subtrai o valor do desconto (se existir)
   * 3. Adiciona o valor de impostos/taxas (se existir)
   * 
   * @example
   * ```tsx
   * const { calculateTotal } = useCalculations(items, materials, services, 50, 10, 'detailed');
   * const total = calculateTotal(); // Retorna o valor total considerando R$50 de desconto e R$10 de impostos
   * ```
   */
  const calculateTotal = useMemo(() => {
    return () => {
      const subtotal = calculateSubtotal();
      let total = subtotal;
      if (discount) total -= discount;
      if (tax) total += tax;
      return total;
    };
  }, [calculateSubtotal, discount, tax]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return {
    calculateSubtotal,
    calculateTotal,
    calculateMaterialsSubtotal,
    calculateServicesSubtotal,
    formatCurrency
  };
};