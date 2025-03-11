'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Calendar, CreditCard, Clock, Download, Share2, Loader2 } from 'lucide-react';

interface EstimateItem {
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

interface Estimate {
  _id: string;
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  address?: string;
  title: string;
  description?: string;
  items: EstimateItem[];
  subtotal: number;
  discount?: number;
  tax?: number;
  total: number;
  notes?: string;
  paymentTerms?: string;
  validUntil?: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  token: string;
  createdAt: string;
  updatedAt: string;
}

export default function EstimateView() {
  const { token } = useParams();
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState<'accepted' | 'rejected' | null>(null);
  const [updating, setUpdating] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const fetchEstimate = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/estimates/${token}`);
        setEstimate(response.data);
      } catch (error: any) {
        console.error('Erro ao buscar orçamento:', error);
        setError(error.response?.data?.error || 'Não foi possível carregar o orçamento');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEstimate();
    }
  }, [token]);

  const updateEstimateStatus = async () => {
    if (!estimate || !statusUpdate) return;
    
    setUpdating(true);
    try {
      await axios.put(`/api/estimates/${estimate._id}/status`, {
        status: statusUpdate,
        token: estimate.token, // Para autorização
      });
      
      setEstimate({
        ...estimate,
        status: statusUpdate,
      });
      
      setShowModal(false);
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        // Aqui você poderia mostrar um toast de erro
      } finally {
        setUpdating(false);
        setStatusUpdate(null);
      }
    };
  
    const copyToClipboard = () => {
      navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    };
  
    const formatDate = (dateString?: string) => {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    };
  
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    };
  
    const getStatusBadge = () => {
      if (!estimate) return null;
      
      const statusConfig = {
        draft: { label: 'Rascunho', color: 'bg-gray-200 text-gray-800' },
        sent: { label: 'Enviado', color: 'bg-blue-100 text-blue-800' },
        accepted: { label: 'Aceito', color: 'bg-green-100 text-green-800' },
        rejected: { label: 'Recusado', color: 'bg-red-100 text-red-800' },
        expired: { label: 'Expirado', color: 'bg-yellow-100 text-yellow-800' },
      };
      
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[estimate.status].color}`}>
          {statusConfig[estimate.status].label}
        </span>
      );
    };
  
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500">Carregando orçamento...</p>
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Orçamento não encontrado</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <a
              href="/"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Voltar para a página inicial
            </a>
          </div>
        </div>
      );
    }
  
    if (!estimate) {
      return null;
    }
  
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header com logo e botões de ação */}
        <header className="bg-white shadow-sm py-4">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                FH
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-semibold">FH Resolve</h1>
                <p className="text-sm text-gray-500">Orçamento Personalizado</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
                aria-label="Compartilhar"
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-gray-100 rounded-full"
                aria-label="Imprimir/Baixar"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </header>
  
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Status e ação do orçamento */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{estimate.title}</h2>
                <div className="flex items-center gap-2">
                  <p className="text-gray-500">Status:</p>
                  {getStatusBadge()}
                </div>
              </div>
              {(estimate.status === 'sent' || estimate.status === 'draft') && (
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setStatusUpdate('accepted');
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1"
                  >
                    <CheckCircle size={16} />
                    Aceitar
                  </button>
                  <button
                    onClick={() => {
                      setStatusUpdate('rejected');
                      setShowModal(true);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1"
                  >
                    <XCircle size={16} />
                    Recusar
                  </button>
                </div>
              )}
              {estimate.status === 'accepted' && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 w-full sm:w-auto">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-green-700">
                        Orçamento aceito! Entraremos em contato em breve.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {estimate.status === 'rejected' && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full sm:w-auto">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">
                        Orçamento recusado.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
  
          {/* Informações do cliente e do orçamento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Dados do Cliente</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Nome:</p>
                  <p className="font-medium">{estimate.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefone:</p>
                  <p className="font-medium">{estimate.clientPhone}</p>
                </div>
                {estimate.clientEmail && (
                  <div>
                    <p className="text-sm text-gray-500">Email:</p>
                    <p className="font-medium">{estimate.clientEmail}</p>
                  </div>
                )}
                {estimate.address && (
                  <div className="sm:col-span-2">
                    <p className="text-sm text-gray-500">Endereço:</p>
                    <p className="font-medium">{estimate.address}</p>
                  </div>
                )}
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Detalhes</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Data do Orçamento:</p>
                    <p className="font-medium">{formatDate(estimate.createdAt)}</p>
                  </div>
                </div>
                {estimate.validUntil && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Válido até:</p>
                      <p className="font-medium">{formatDate(estimate.validUntil)}</p>
                    </div>
                  </div>
                )}
                {estimate.paymentTerms && (
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-500">Condições de Pagamento:</p>
                      <p className="font-medium">{estimate.paymentTerms}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
  
          {/* Descrição do orçamento */}
          {estimate.description && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Descrição</h3>
              <p className="text-gray-700 whitespace-pre-line">{estimate.description}</p>
            </div>
          )}
  
          {/* Itens do orçamento */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium mb-4 border-b pb-2">Itens do Orçamento</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
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
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.unit}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.unitPrice)}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.quantity * item.unitPrice)}</td>
                    </tr>
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
          </div>
  
          {/* Observações */}
          {estimate.notes && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Observações</h3>
              <p className="text-gray-700 whitespace-pre-line">{estimate.notes}</p>
            </div>
          )}
  
          {/* Contato e informações da empresa */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-blue-800">Entre em contato</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-800">Telefone:</p>
                <p className="font-medium text-blue-900">(48) 99191-9791</p>
              </div>
              <div>
                <p className="text-sm text-blue-800">Email:</p>
                <p className="font-medium text-blue-900">contato@fhresolve.com.br</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-blue-800">Endereço:</p>
                <p className="font-medium text-blue-900">Ratones, Florianópolis - SC</p>
              </div>
            </div>
          </div>
        </main>
  
        <footer className="bg-white py-6 mt-8 border-t">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} FH Resolve - Todos os direitos reservados</p>
            <p className="mt-1">CNPJ: 00.000.000/0000-00</p>
          </div>
        </footer>
  
        {/* Modal de confirmação */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              >
                <div className="text-center">
                  {statusUpdate === 'accepted' ? (
                    <>
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aceitar Orçamento</h3>
                      <p className="text-gray-500 mb-6">
                        Ao aceitar este orçamento, você concorda com os termos, valores e condições descritos. Deseja prosseguir?
                      </p>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Recusar Orçamento</h3>
                      <p className="text-gray-500 mb-6">
                        Tem certeza que deseja recusar este orçamento? Esta ação não pode ser desfeita.
                      </p>
                    </>
                  )}
                  
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={updateEstimateStatus}
                      disabled={updating}
                      className={`px-4 py-2 rounded-md text-white ${
                        statusUpdate === 'accepted'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      } flex items-center gap-2`}
                    >
                      {updating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          {statusUpdate === 'accepted' ? 'Confirmar Aceitação' : 'Confirmar Recusa'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
  
        {/* Modal de compartilhamento */}
        <AnimatePresence>
          {showShareModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Compartilhar Orçamento</h3>
                <p className="text-gray-500 mb-4">
                  Compartilhe este orçamento copiando o link abaixo:
                </p>
                
                <div className="flex mb-6">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md text-gray-900 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                  >
                    {linkCopied ? 'Copiado!' : 'Copiar'}
                  </button>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }