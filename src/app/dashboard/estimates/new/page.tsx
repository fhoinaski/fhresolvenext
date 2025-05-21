'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import type { FormEvent } from 'react';

import { Calculator } from 'lucide-react';
import PageHeader from '@/components/new-estimate/PageHeader';
import EstimateTypeSelector from '@/components/new-estimate/EstimateTypeSelector';
import ClientInfoCard from '@/components/new-estimate/ClientInfoCard';
import EstimateDetailsCard from '@/components/new-estimate/EstimateDetailsCard';
import DetailedItemsTable from '@/components/new-estimate/DetailedItemsTable';
import MaterialsTable from '@/components/new-estimate/MaterialsTable';
import ServicesTable from '@/components/new-estimate/ServicesTable';
import TotalsCard from '@/components/new-estimate/TotalsCard';
import AdditionalInfoCard from '@/components/new-estimate/AdditionalInfoCard';
import ActionButtons from '@/components/new-estimate/ActionButtons';
import SuccessModal from '@/components/new-estimate/SuccessModal';
import { useEstimateSchema } from '@/hooks/useEstimateSchema';
import { useCalculations } from '@/hooks/useCalculations';
import { EstimateFormValues, EstimateType } from '@/types/estimate';

export default function NewEstimatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [estimateType, setEstimateType] = useState<EstimateType>('detailed');

  const { estimateSchema } = useEstimateSchema();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const { register, handleSubmit, control, watch, setValue, formState: { errors, isDirty } } = useForm<EstimateFormValues>({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      estimateType: 'detailed',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      subtotal: 0,
      total: 0,
      address: '',
      title: '',
      description: '',
      items: [{ description: '', quantity: 1, unit: 'un', unitPrice: 0 }],
      materials: [{ description: '', quantity: 1, unit: 'un', unitPrice: 0 }],
      services: [{ description: '', value: 0 }],
      discount: 0,
      tax: 0,
      notes: '',
      paymentTerms: 'Pagamento em até 12x no cartão ou via PIX/transferência bancária.',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
  });

  const itemsFieldArray = useFieldArray({ control, name: 'items' });
  const materialsFieldArray = useFieldArray({ control, name: 'materials' });
  const servicesFieldArray = useFieldArray({ control, name: 'services' });

  const currentEstimateType = watch('estimateType');
  const items = watch('items') || [];
  const materials = watch('materials') || [];
  const services = watch('services') || [];
  const discount = watch('discount') || 0;
  const tax = watch('tax') || 0;

  const {
    calculateSubtotal,
    calculateTotal,
    calculateMaterialsSubtotal,
    calculateServicesSubtotal,
    formatCurrency
  } = useCalculations(items, materials, services, discount, tax, estimateType);
  useEffect(() => {
    if (currentEstimateType !== estimateType) setEstimateType(() => currentEstimateType as EstimateType);
  }, [currentEstimateType, estimateType]);

  useEffect(() => {
    setValue('subtotal', calculateSubtotal());
    setValue('total', calculateTotal());
  }, [items, materials, services, discount, tax, calculateSubtotal, calculateTotal, setValue]);

  const onSubmit = async (data: EstimateFormValues) => {
    console.log('Iniciando submissão do formulário:', data);
    
    // Filtrar dados com base no tipo de orçamento
    const dataToSend = { ...data };
    dataToSend.subtotal = calculateSubtotal();
    dataToSend.total = calculateTotal();
    
    // Remover campos desnecessários de acordo com o tipo de orçamento
    if (dataToSend.estimateType === 'simple') {
      delete dataToSend.items;
      delete dataToSend.materials;
    } else if (dataToSend.estimateType === 'materials') {
      delete dataToSend.items;
    } else if (dataToSend.estimateType === 'detailed') {
      delete dataToSend.materials;
      delete dataToSend.services;
    }
    
    setIsSubmitting(true);
  
    try {
      console.log('Enviando dados para a API:', dataToSend);
      const response = await axios.post('/api/estimates', dataToSend);
      console.log('Resposta da API:', response);
      toast.success('Orçamento criado com sucesso!');
      setGeneratedLink(response.data.estimateLink);
      setShowLinkModal(true);
      setTimeout(() => router.push('/dashboard/estimates'), 500);
    } catch (error: any) {
      console.error('Erro detalhado:', error);
      console.error('Status do erro:', error.response?.status);
      console.error('Dados do erro:', error.response?.data);
      const errorMsg = error.response?.data?.error || 'Erro ao salvar orçamento. Verifique os dados e tente novamente.';
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
      console.log('Submissão finalizada');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    toast.success('Link copiado para a área de transferência!');
    setTimeout(() => setLinkCopied(false), 3000);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const quoteId = params.get('from_quote');
    if (quoteId) {
      const fetchQuote = async () => {
        try {
          const response = await axios.get(`/api/quotes/${quoteId}`);
          const quote = response.data;
          setValue('clientName', quote.name);
          setValue('clientPhone', quote.phone);
          setValue('title', `Orçamento para ${quote.name}`);
          setValue('description', quote.message);
          toast.success('Dados do pedido carregados!');
        } catch (error) {
          console.error('Erro ao carregar dados do pedido:', error);
          toast.error('Erro ao carregar dados do pedido');
        }
      };
      fetchQuote();
    }
  }, [setValue]);

  const manualSubmit = () => {
    console.log("Submit manual iniciado");

    // Teste se os dados básicos existem
    const formData = {
      estimateType: watch('estimateType'),
      clientName: watch('clientName'),
      clientPhone: watch('clientPhone'),
      title: watch('title'),
      items: watch('items'),
      materials: watch('materials'),
      services: watch('services'),
      discount: watch('discount'),
      tax: watch('tax'),
      notes: watch('notes'),
      paymentTerms: watch('paymentTerms'),
      validUntil: watch('validUntil')
    };

    console.log("Dados do formulário coletados:", formData);

    // Verificação manual dos campos obrigatórios
    if (!formData.clientName) {
      toast.error("Nome do cliente é obrigatório");
      return;
    }

    if (!formData.clientPhone) {
      toast.error("Telefone do cliente é obrigatório");
      return;
    }

    if (!formData.title) {
      toast.error("Título do orçamento é obrigatório");
      return;
    }

    // Se chegou aqui, os dados básicos estão ok
    console.log("Validação básica passou, enviando para API");
    onSubmit(formData as EstimateFormValues);
  };

  const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

  return (
    <div className="space-y-6 pb-6">
      <PageHeader router={router} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <EstimateTypeSelector
          register={register}
          estimateType={estimateType}
          setValue={setValue}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div className="lg:col-span-2 space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
            <ClientInfoCard
              register={register}
              errors={errors}
            />

            <EstimateDetailsCard
              register={register}
              errors={errors}
            />

            {estimateType === 'detailed' && (
              <DetailedItemsTable
                itemsFieldArray={itemsFieldArray}
                register={register}
                errors={errors}
                items={items}
                formatCurrency={formatCurrency}
                calculateSubtotal={calculateSubtotal}
                discount={discount}
                tax={tax}
                calculateTotal={calculateTotal}
                isMobile={isMobile}
              />
            )}

            {estimateType === 'materials' && (
              <>
                <MaterialsTable
                  materialsFieldArray={materialsFieldArray}
                  register={register}
                  errors={errors}
                  materials={materials}
                  formatCurrency={formatCurrency}
                  calculateMaterialsSubtotal={calculateMaterialsSubtotal}
                  isMobile={isMobile}
                />

                <ServicesTable
                  servicesFieldArray={servicesFieldArray}
                  register={register}
                  errors={errors}
                  services={services}
                  formatCurrency={formatCurrency}
                  calculateServicesSubtotal={calculateServicesSubtotal}
                  isMobile={isMobile}
                />

                <TotalsCard
                  register={register}
                  calculateMaterialsSubtotal={calculateMaterialsSubtotal}
                  calculateServicesSubtotal={calculateServicesSubtotal}
                  calculateSubtotal={calculateSubtotal}
                  discount={discount}
                  tax={tax}
                  calculateTotal={calculateTotal}
                  formatCurrency={formatCurrency}
                  isMobile={isMobile}
                />
              </>
            )}

            {estimateType === 'simple' && (
              <ServicesTable
                servicesFieldArray={servicesFieldArray}
                register={register}
                errors={errors}
                services={services}
                formatCurrency={formatCurrency}
                calculateServicesSubtotal={calculateServicesSubtotal}
                calculateSubtotal={calculateSubtotal}
                discount={discount}
                tax={tax}
                calculateTotal={calculateTotal}
                isSimpleEstimate={true}
                isMobile={isMobile}
              />
            )}
          </motion.div>

          <motion.div className="space-y-6" initial="hidden" animate="visible" variants={fadeIn}>
            <AdditionalInfoCard
              register={register}
            />

            <ActionButtons
              router={router}
              isSubmitting={isSubmitting}
              onSaveClick={manualSubmit} // Use a nova função aqui
            />

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-md">
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
          </motion.div>
        </div>
      </form>

      <SuccessModal
        showLinkModal={showLinkModal}
        generatedLink={generatedLink}
        linkCopied={linkCopied}
        copyToClipboard={copyToClipboard}
        router={router}
      />
    </div>
  );
}