// hooks/useEstimateSchema.ts
import { z } from 'zod';

export const useEstimateSchema = () => {
  const estimateItemSchema = z.object({
    description: z.string().min(1, 'Descrição é obrigatória'),
    quantity: z.number().positive('Quantidade deve ser maior que zero'),
    unit: z.string().default('un'),
    unitPrice: z.number().min(0, 'Preço não pode ser negativo'),
  });

  const materialItemSchema = z.object({
    description: z.string().min(1, 'Descrição é obrigatória'),
    quantity: z.number().positive('Quantidade deve ser maior que zero'),
    unit: z.string().default('un'),
    unitPrice: z.number().min(0, 'Preço não pode ser negativo'),
  });

  const serviceItemSchema = z.object({
    description: z.string().min(1, 'Descrição é obrigatória'),
    value: z.number().min(0, 'Valor não pode ser negativo'),
  });

  const estimateSchema = z.object({
    estimateType: z.enum(['detailed', 'materials', 'simple']),
    clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
    clientEmail: z.string().email('Email inválido').optional().or(z.literal('')),
    clientPhone: z.string().min(1, 'Telefone do cliente é obrigatório'),
    address: z.string().optional().or(z.literal('')),
    title: z.string().min(1, 'Título do orçamento é obrigatório'),
    description: z.string().optional().or(z.literal('')),
    items: z.array(estimateItemSchema).optional(),
    materials: z.array(materialItemSchema).optional(),
    services: z.array(serviceItemSchema).optional(),
    subtotal: z.number().optional(),
    discount: z.number().min(0, 'Desconto não pode ser negativo').optional(),
    tax: z.number().min(0, 'Taxas não podem ser negativas').optional(),
    total: z.number().optional(),
    notes: z.string().optional().or(z.literal('')),
    paymentTerms: z.string().optional().or(z.literal('')),
    validUntil: z.string().optional().or(z.literal('')),
  }).refine((data) => {
    if (data.estimateType === 'detailed') return data.items && data.items.length > 0;
    if (data.estimateType === 'materials') return (data.materials && data.materials.length > 0) && (data.services && data.services.length > 0);
    if (data.estimateType === 'simple') return data.services && data.services.length > 0;
    return true;
  }, {
    message: 'Adicione pelo menos um item ao orçamento conforme o tipo selecionado',
    path: ['items'],
  });

  return { estimateSchema };
};