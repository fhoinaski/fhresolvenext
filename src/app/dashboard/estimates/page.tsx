'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading } from '@/components/ui/Card';
import { Plus, Copy, CheckCircle, FileText, Edit, Trash2, Send, Eye, AlertTriangle, Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

interface Estimate {
  _id: string;
  clientName: string;
  clientPhone: string;
  title: string;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  token: string;
  createdAt: string;
  updatedAt: string;
}

export default function EstimatesPage() {
  const router = useRouter();
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEstimate, setSelectedEstimate] = useState<Estimate | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    fetchEstimates();
  }, []);

  const fetchEstimates = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Estimate[]>('/api/estimates');
      setEstimates(response.data);
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error);
      toast.error('Erro ao carregar orçamentos');
    } finally {
      setLoading(false);
    }
  };

  const deleteEstimate = async () => {
    if (!selectedEstimate) return;
    
    setDeleting(true);
    try {
      await axios.delete(`/api/estimates/${selectedEstimate._id}`);
      toast.success('Orçamento excluído com sucesso');
      setShowDeleteConfirm(false);
      fetchEstimates();
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error);
      toast.error('Erro ao excluir orçamento');
    } finally {
      setDeleting(false);
    }
  };

  const updateStatus = async (id: string, status: Estimate['status']) => {
    try {
      await axios.put(`/api/estimates/${id}/status`, { status });
      toast.success('Status atualizado com sucesso');
      fetchEstimates();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status');
    }
  };

  const shareEstimate = (estimate: Estimate) => {
    setSelectedEstimate(estimate);
    setShowShareModal(true);
    setLinkCopied(false);
  };

  const copyToClipboard = () => {
    if (!selectedEstimate) return;
    
    const link = `${window.location.origin}/orcamento/${selectedEstimate.token}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    toast.success('Link copiado para a área de transferência');
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const sendEstimateEmail = async () => {
    if (!selectedEstimate) return;
    
    setSendingEmail(true);
    try {
      // Esta API ainda não existe, você precisará implementá-la
      // await axios.post(`/api/estimates/${selectedEstimate._id}/send`);
      await updateStatus(selectedEstimate._id, 'sent');
      toast.success('Orçamento enviado com sucesso');
      setShowShareModal(false);
    } catch (error) {
      console.error('Erro ao enviar orçamento:', error);
      toast.error('Erro ao enviar orçamento');
    } finally {
      setSendingEmail(false);
    }
  };

  const getStatusBadge = (status: Estimate['status']) => {
    const statusConfig = {
      draft: { label: 'Rascunho', class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
      sent: { label: 'Enviado', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      accepted: { label: 'Aceito', class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
      rejected: { label: 'Recusado', class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' },
      expired: { label: 'Expirado', class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[status].class}`}>
        {statusConfig[status].label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Orçamentos" description="Crie e gerencie orçamentos para clientes" />
        <button
          onClick={() => router.push('/dashboard/estimates/new')}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Orçamento
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : estimates.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhum orçamento encontrado</p>
            <button
              onClick={() => router.push('/dashboard/estimates/new')}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Criar Primeiro Orçamento
            </button>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {estimates.map((estimate) => (
                  <tr key={estimate._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {estimate.clientName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {estimate.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {formatCurrency(estimate.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(estimate.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(estimate.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center space-x-2">
                        <button
                          onClick={() => router.push(`/dashboard/estimates/${estimate._id}`)}
                          className="text-gray-500 hover:text-accent"
                          title="Ver orçamento"
                        >
                          <Eye size={16} />
                        </button>
                        {estimate.status === 'draft' && (
                          <>
                            <button
                              onClick={() => router.push(`/dashboard/estimates/${estimate._id}/edit`)}
                              className="text-gray-500 hover:text-accent"
                              title="Editar"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEstimate(estimate);
                                setShowDeleteConfirm(true);
                              }}
                              className="text-gray-500 hover:text-red-500"
                              title="Excluir"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                        {(estimate.status === 'draft' || estimate.status === 'sent') && (
                          <button
                            onClick={() => shareEstimate(estimate)}
                            className="text-gray-500 hover:text-green-500"
                            title="Compartilhar"
                          >
                            <Send size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && selectedEstimate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-xl font-medium">Confirmar Exclusão</h2>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Tem certeza que deseja excluir o orçamento <strong>{selectedEstimate.title}</strong> para {selectedEstimate.clientName}? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={deleteEstimate}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Excluir
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de compartilhamento */}
      {showShareModal && selectedEstimate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Compartilhar Orçamento</h2>
              
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Link para visualização do orçamento:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/orcamento/${selectedEstimate.token}`}
                      readOnly
                      className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-accent hover:bg-accent/10 rounded-md"
                      title="Copiar link"
                    >
                      {linkCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
                
                {selectedEstimate.status === 'draft' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FileText className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700 dark:text-blue-400">
                          Este orçamento está em rascunho. Deseja alterá-lo para "Enviado" ao compartilhar?
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Fechar
                </button>
                {selectedEstimate.status === 'draft' && (
                  <button
                    onClick={() => updateStatus(selectedEstimate._id, 'sent')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                  >
                    Marcar como Enviado
                  </button>
                )}
                {selectedEstimate.clientEmail && (
                  <button
                    onClick={sendEstimateEmail}
                    disabled={sendingEmail}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {sendingEmail ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Enviar por Email
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}