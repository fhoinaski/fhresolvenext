'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

import { Card, Heading } from '@/components/ui/Card';
import { Loader2, ArrowLeft, Plus, Trash2, Calculator, Calendar, Save, CreditCard, CheckCircle } from 'lucide-react';

// Schema para validação
const estimateItemSchema = z.object({
  description: z.string().min(1, 'Descrição é obrigatória'),
  quantity: z.number().positive('Quantidade deve ser maior que zero'),
  unit: z.string().default('un'),
  unitPrice: z.number().min(0, 'Preço não pode ser negativo'),
});

const estimateSchema = z.object({
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  clientEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  clientPhone: z.string().min(1, 'Telefone do cliente é obrigatório'),
  address: z.string().optional().or(z.literal('')),
  title: z.string().min(1, 'Título do orçamento é obrigatório'),
  description: z.string().optional().or(z.literal('')),
  items: z.array(estimateItemSchema).min(1, 'Adicione pelo menos um item'),
  subtotal: z.number().optional(),
  discount: z.number().min(0, 'Desconto não pode ser negativo').optional(),
  tax: z.number().min(0, 'Taxas não podem ser negativas').optional(),
  total: z.number().optional(),
  notes: z.string().optional().or(z.literal('')),
  paymentTerms: z.string().optional().or(z.literal('')),
  validUntil: z.string().optional().or(z.literal('')),
});

type EstimateFormValues = z.infer<typeof estimateSchema>;

export default function NewEstimatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<EstimateFormValues>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      address: '',
      title: '',
      description: '',
      items: [{ description: '', quantity: 1, unit: 'un', unitPrice: 0 }],
      discount: 0,
      tax: 0,
      notes: '',
      paymentTerms: 'Pagamento em até 12x no cartão ou via PIX/transferência bancária.',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 dias a partir de hoje
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  
  // Observar os itens para calcular o subtotal
  const items = watch('items');
  const discount = watch('discount') || 0;
  const tax = watch('tax') || 0;
  
  // Calcular subtotal sempre que os itens mudarem
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      return sum + (item.quantity || 0) * (item.unitPrice || 0);
    }, 0);
  };
  
  // Calcular o total
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    let total = subtotal;
    
    if (discount) {
      total -= discount;
    }
    
    if (tax) {
      total += tax;
    }
    
    return total;
  };
  
  const onSubmit = async (data: EstimateFormValues) => {
    // Adicionar os totais calculados
    data.subtotal = calculateSubtotal();
    data.total = calculateTotal();
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/estimates', data);
      
      toast.success('Orçamento criado com sucesso');
      setGeneratedLink(response.data.estimateLink);
      setShowLinkModal(true);
    } catch (error) {
      console.error('Erro ao criar orçamento:', error);
      toast.error('Erro ao criar orçamento');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const addItem = () => {
    append({ description: '', quantity: 1, unit: 'un', unitPrice: 0 });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    toast.success('Link copiado para a área de transferência');
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  useEffect(() => {
    // Verificar se há um parâmetro 'from_quote' na URL
    const params = new URLSearchParams(window.location.search);
    const quoteId = params.get('from_quote');
    
    if (quoteId) {
      // Buscar os dados do pedido
      const fetchQuote = async () => {
        try {
          const response = await axios.get(`/api/quotes/${quoteId}`);
          const quote = response.data;
          
          // Preencher o formulário com os dados do pedido
          setValue('clientName', quote.name);
          setValue('clientPhone', quote.phone);
          setValue('title', `Orçamento para ${quote.name}`);
          setValue('description', quote.message);
          
          toast.success('Dados do pedido carregados');
        } catch (error) {
          console.error('Erro ao carregar dados do pedido:', error);
          toast.error('Erro ao carregar dados do pedido');
        }
      };
      
      fetchQuote();
    }
  }, [setValue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={20} />
        </button>
        <Heading title="Novo Orçamento" description="Crie um orçamento detalhado para seu cliente" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Dados do Cliente */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Dados do Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome do Cliente
                    </label>
                    <input
                      id="clientName"
                      {...register('clientName')}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.clientName ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.clientName && (
                      <p className="mt-1 text-sm text-red-500">{errors.clientName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Telefone
                    </label>
                    <input
                      id="clientPhone"
                      {...register('clientPhone')}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.clientPhone ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.clientPhone && (
                      <p className="mt-1 text-sm text-red-500">{errors.clientPhone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email (opcional)
                    </label>
                    <input
                      id="clientEmail"
                      type="email"
                      {...register('clientEmail')}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.clientEmail ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.clientEmail && (
                      <p className="mt-1 text-sm text-red-500">{errors.clientEmail.message}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Endereço (opcional)
                    </label>
                    <input
                      id="address"
                      {...register('address')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Detalhes do Orçamento */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Detalhes do Orçamento</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Título do Orçamento
                    </label>
                    <input
                      id="title"
                      {...register('title')}
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Ex: Reforma do Banheiro"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Descrição (opcional)
                    </label>
                    <textarea
                      id="description"
                      {...register('description')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Descrição detalhada do serviço a ser realizado"
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Itens do Orçamento */}
            <Card>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Itens do Orçamento</h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="px-3 py-1 bg-accent hover:bg-accent/90 text-white rounded flex items-center gap-1 text-sm"
                  >
                    <Plus size={16} />
                    Adicionar Item
                  </button>
                </div>
                
                {errors.items?.message && (
                  <p className="mb-4 text-sm text-red-500">{errors.items.message}</p>
                )}
                
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">
                          Qtd
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">
                          Un
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                          Preço Un
                        </th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                          Total
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                          <span className="sr-only">Ações</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {fields.map((field, index) => (
                        <tr key={field.id}>
                          <td className="px-3 py-2">
                            <input
                              {...register(`items.${index}.description` as const)}
                              className={`w-full px-2 py-1 border rounded-md dark:bg-gray-700 dark:text-white text-sm ${
                                errors.items?.[index]?.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              placeholder="Descrição do item"
                            />
                            {errors.items?.[index]?.description && (
                              <p className="mt-1 text-xs text-red-500">{errors.items?.[index]?.description?.message}</p>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                              className={`w-full px-2 py-1 border rounded-md dark:bg-gray-700 dark:text-white text-sm ${
                                errors.items?.[index]?.quantity ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              min="0.01"
                              step="0.01"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              {...register(`items.${index}.unit` as const)}
                              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                              placeholder="un"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              {...register(`items.${index}.unitPrice` as const, { valueAsNumber: true })}
                              className={`w-full px-2 py-1 border rounded-md dark:bg-gray-700 dark:text-white text-sm ${
                                errors.items?.[index]?.unitPrice ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                              }`}
                              min="0"
                              step="0.01"
                            />
                          </td>
                          <td className="px-3 py-2 text-right text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {formatCurrency((items[index]?.quantity || 0) * (items[index]?.unitPrice || 0))}
                          </td>
                          <td className="px-3 py-2">
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 hover:text-red-700 focus:outline-none"
                              disabled={fields.length === 1}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={4} className="px-3 py-2 text-right font-medium">
                          Subtotal:
                        </td>
                        <td className="px-3 py-2 text-right font-medium">
                          {formatCurrency(calculateSubtotal())}
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-3 py-2 text-right font-medium">
                          Desconto:
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            {...register('discount', { valueAsNumber: true })}
                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2 text-right text-sm text-gray-700 dark:text-gray-300">
                          -{formatCurrency(discount)}
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-3 py-2 text-right font-medium">
                          Taxas/Adicionais:
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            {...register('tax', { valueAsNumber: true })}
                            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white text-sm"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="px-3 py-2 text-right text-sm text-gray-700 dark:text-gray-300">
                          +{formatCurrency(tax)}
                        </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="px-3 py-3 text-right font-bold text-base">
                          Total:
                        </td>
                        <td className="px-3 py-3 text-right font-bold text-base text-accent">
                          {formatCurrency(calculateTotal())}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar com informações adicionais */}
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Informações Adicionais</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Válido até
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="validUntil"
                        type="date"
                        {...register('validUntil')}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="paymentTerms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Condições de Pagamento
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard size={16} className="text-gray-400" />
                      </div>
                      <textarea
                        id="paymentTerms"
                        {...register('paymentTerms')}
                        rows={3}
                        className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Observações
                    </label>
                    <textarea
                      id="notes"
                      {...register('notes')}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Informações adicionais sobre o orçamento"
                    />
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    Salvar
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Calculator className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700 dark:text-blue-400">
                    Os subtotais e o total são calculados automaticamente com base nos itens e valores inseridos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      
      {/* Modal de orçamento criado com link */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Orçamento Criado com Sucesso
              </h2>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                O orçamento foi criado e está pronto para ser compartilhado com o cliente.
              </p>
              
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link do orçamento:
                </p>
                <div className="flex">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700 dark:text-white text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-2 bg-accent hover:bg-accent/90 text-white rounded-r-md flex items-center gap-1"
                    title="Copiar link"
                  >
                    {linkCopied ? "Copiado!" : "Copiar"}
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => router.push('/dashboard/estimates')}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Ver Lista
                </button>
                <button
                  onClick={() => router.push(`/orcamento/${generatedLink.split('/').pop()}`)}
                  className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md"
                >
                  Visualizar Orçamento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}