'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Copy, 
  CheckCircle, 
  FileText, 
  Edit, 
  Trash2, 
  Send, 
  Eye, 
  AlertTriangle, 
  Loader2,
  X,
  ChevronRight,
  Calendar,
  DollarSign
} from 'lucide-react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';
import { Heading } from '@/components/ui/Heading';

interface Estimate {
  _id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
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
  const [searchTerm, setSearchTerm] = useState('');  type SortableFields = 'createdAt' | 'clientName' | 'title' | 'total' | 'status';
  const [sortConfig, setSortConfig] = useState<{key: SortableFields, direction: 'asc' | 'desc'}>({
    key: 'createdAt',
    direction: 'desc'
  });

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
      draft: { 
        label: 'Rascunho', 
        class: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        icon: <FileText size={14} className="mr-1" />
      },
      sent: { 
        label: 'Enviado', 
        class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        icon: <Send size={14} className="mr-1" />
      },
      accepted: { 
        label: 'Aceito', 
        class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        icon: <CheckCircle size={14} className="mr-1" />
      },
      rejected: { 
        label: 'Recusado', 
        class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        icon: <X size={14} className="mr-1" />
      },
      expired: { 
        label: 'Expirado', 
        class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        icon: <AlertTriangle size={14} className="mr-1" />
      },
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[status].class}`}>
        {statusConfig[status].icon}
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
  // Ordenação de tabela
  const requestSort = (key: SortableFields) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  const getSortedEstimates = () => {
    const filteredEstimates = searchTerm
      ? estimates.filter(
          est => 
            est.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            est.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : estimates;

    return [...filteredEstimates].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortConfig.direction === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (aVal < bVal) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedEstimates = getSortedEstimates();

  // Animações
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 } 
    }
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25 } 
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      transition: { duration: 0.2 } 
    }
  };
  
  // Hook para detectar o tamanho da tela
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar inicialmente
    checkScreenSize();
    
    // Adicionar listener para redimensionamento
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Heading title="Orçamentos" description="Crie e gerencie orçamentos para clientes" />
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push('/dashboard/estimates/new')}
          className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-4 py-2 rounded-md flex items-center gap-2 self-start md:self-auto"
        >
          <Plus size={18} />
          Novo Orçamento
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-accent)]"
          />
        </div>
      ) : estimates.length === 0 ? (
        <Card>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="py-10 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-[var(--color-neutral)]/20">
                <FileText size={32} className="text-[var(--color-accent)]" />
              </div>
            </div>
            <p className="text-[var(--color-text)] opacity-70 mb-6">
              Nenhum orçamento encontrado
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/dashboard/estimates/new')}
              className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={18} />
              Criar Primeiro Orçamento
            </motion.button>
          </motion.div>
        </Card>
      ) : (
        <>
          <div className="mb-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                className="w-full px-4 py-2 pl-10 rounded-lg border border-[var(--color-neutral)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 bg-[var(--color-card-bg)] text-[var(--color-card-text)]"
                placeholder="Buscar orçamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-secondary)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <Card>
            {/* Visualização em formato de tabela para telas médias e grandes */}
            <div className="hidden md:block overflow-x-auto rounded-lg">
              <table className="w-full">
                <thead className="bg-[var(--color-neutral)]/10 border-b border-[var(--color-neutral)]/20">
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('clientName')}
                    >
                      <div className="flex items-center gap-1">
                        Cliente
                        {sortConfig.key === 'clientName' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('title')}
                    >
                      <div className="flex items-center gap-1">
                        Título
                        {sortConfig.key === 'title' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('total')}
                    >
                      <div className="flex items-center gap-1">
                        <DollarSign size={14} />
                        Valor
                        {sortConfig.key === 'total' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {sortConfig.key === 'status' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70 cursor-pointer hover:text-[var(--color-accent)]"
                      onClick={() => requestSort('createdAt')}
                    >
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        Data
                        {sortConfig.key === 'createdAt' && (
                          <ChevronRight size={14} className={`transform ${sortConfig.direction === 'asc' ? 'rotate-90' : '-rotate-90'}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--color-card-text)] opacity-70">
                      Ações
                    </th>
                  </tr>
                </thead>
                <motion.tbody 
                  className="bg-[var(--color-card-bg)] divide-y divide-[var(--color-neutral)]/15"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {sortedEstimates.map((estimate) => (
                    <motion.tr 
                      key={estimate._id} 
                      className="hover:bg-[var(--color-neutral)]/5 transition-colors"
                      variants={itemVariants}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[var(--color-card-text)]">
                          {estimate.clientName}
                        </div>
                        <div className="text-xs text-[var(--color-card-text)] opacity-60">
                          {estimate.clientPhone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap max-w-xs truncate">
                        <div className="text-sm text-[var(--color-card-text)] opacity-80">
                          {estimate.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[var(--color-card-text)]">
                          {formatCurrency(estimate.total)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(estimate.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[var(--color-card-text)] opacity-70 flex items-center">
                          {formatDate(estimate.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end items-center space-x-1">
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            onClick={() => router.push(`/dashboard/estimates/${estimate._id}`)}
                            className="p-1.5 rounded-full text-[var(--color-card-text)] opacity-70 hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)] hover:opacity-100"
                            title="Ver orçamento"
                          >
                            <Eye size={18} />
                          </motion.button>
                          {estimate.status === 'draft' && (
                            <>
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                onClick={() => router.push(`/dashboard/estimates/${estimate._id}/edit`)}
                                className="p-1.5 rounded-full text-[var(--color-card-text)] opacity-70 hover:bg-blue-500/10 hover:text-blue-500 hover:opacity-100"
                                title="Editar"
                              >
                                <Edit size={18} />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.15 }}
                                onClick={() => {
                                  setSelectedEstimate(estimate);
                                  setShowDeleteConfirm(true);
                                }}
                                className="p-1.5 rounded-full text-[var(--color-card-text)] opacity-70 hover:bg-red-500/10 hover:text-red-500 hover:opacity-100"
                                title="Excluir"
                              >
                                <Trash2 size={18} />
                              </motion.button>
                            </>
                          )}
                          {(estimate.status === 'draft' || estimate.status === 'sent') && (
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              onClick={() => shareEstimate(estimate)}
                              className="p-1.5 rounded-full text-[var(--color-card-text)] opacity-70 hover:bg-green-500/10 hover:text-green-500 hover:opacity-100"
                              title="Compartilhar"
                            >
                              <Send size={18} />
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>

            {/* Visualização em formato de cards para telas pequenas */}
            <div className="md:hidden">
              <motion.div 
                className="grid grid-cols-1 gap-4 p-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {sortedEstimates.map((estimate) => (
                  <motion.div 
                    key={estimate._id}
                    variants={itemVariants}
                    className="bg-[var(--color-neutral)]/5 rounded-lg overflow-hidden border border-[var(--color-neutral)]/20"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium text-[var(--color-card-text)]">{estimate.clientName}</h3>
                          <p className="text-xs text-[var(--color-card-text)] opacity-60 mt-0.5">{estimate.clientPhone}</p>
                        </div>
                        <div>
                          {getStatusBadge(estimate.status)}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-card-text)] opacity-70">Título:</span>
                          <span className="text-[var(--color-card-text)] font-medium">{estimate.title}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-card-text)] opacity-70">Valor:</span>
                          <span className="text-[var(--color-card-text)] font-medium">{formatCurrency(estimate.total)}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-[var(--color-card-text)] opacity-70">Data:</span>
                          <span className="text-[var(--color-card-text)]">{formatDate(estimate.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[var(--color-neutral)]/10 px-4 py-3 flex justify-end gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(`/dashboard/estimates/${estimate._id}`)}
                        className="p-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                        aria-label="Ver orçamento"
                      >
                        <Eye size={18} />
                      </motion.button>
                      
                      {estimate.status === 'draft' && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push(`/dashboard/estimates/${estimate._id}/edit`)}
                            className="p-2 rounded-full bg-blue-500/10 text-blue-500"
                            aria-label="Editar orçamento"
                          >
                            <Edit size={18} />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedEstimate(estimate);
                              setShowDeleteConfirm(true);
                            }}
                            className="p-2 rounded-full bg-red-500/10 text-red-500"
                            aria-label="Excluir orçamento"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </>
                      )}
                      
                      {(estimate.status === 'draft' || estimate.status === 'sent') && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => shareEstimate(estimate)}
                          className="p-2 rounded-full bg-green-500/10 text-green-500"
                          aria-label="Compartilhar orçamento"
                        >
                          <Send size={18} />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Card>
        </>
      )}

      {/* Modal de confirmação de exclusão */}
      <AnimatePresence>
        {showDeleteConfirm && selectedEstimate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              className="bg-[var(--color-card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-1 bg-gradient-to-r from-red-500 to-red-600">
                <div className="p-5 bg-[var(--color-card-bg)] rounded-t-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      <AlertTriangle size={24} />
                    </div>
                    <h2 className="text-xl font-medium text-[var(--color-card-text)]">Confirmar Exclusão</h2>
                  </div>
                  
                  <p className="text-[var(--color-card-text)] opacity-80 mb-8">
                    Tem certeza que deseja excluir o orçamento <strong>{selectedEstimate.title}</strong> para {selectedEstimate.clientName}? Esta ação não pode ser desfeita.
                  </p>
                  
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 border border-[var(--color-neutral)]/30 text-[var(--color-card-text)] rounded-md hover:bg-[var(--color-neutral)]/10"
                    >
                      Cancelar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal de compartilhamento */}
      <AnimatePresence>
        {showShareModal && selectedEstimate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              className="bg-[var(--color-card-bg)] rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-dark)]">
                <div className="p-5 bg-[var(--color-card-bg)] rounded-t-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <Send size={20} />
                    </div>
                    <h2 className="text-xl font-medium text-[var(--color-card-text)]">Compartilhar Orçamento</h2>
                  </div>
                  
                  <div className="space-y-5 mb-6">
                    <div className="bg-[var(--color-neutral)]/10 p-4 rounded-md">
                      <p className="text-sm text-[var(--color-card-text)] opacity-70 mb-3">
                        Link para visualização do orçamento:
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={`${window.location.origin}/orcamento/${selectedEstimate.token}`}
                          readOnly
                          className="flex-1 p-2 text-sm border border-[var(--color-neutral)]/30 rounded-md bg-[var(--color-card-bg)] text-[var(--color-card-text)]"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={copyToClipboard}
                          className={`p-2 rounded-md transition-colors ${
                            linkCopied 
                              ? 'bg-green-500/10 text-green-500' 
                              : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20'
                          }`}
                          title="Copiar link"
                        >
                          {linkCopied ? <CheckCircle size={20} /> : <Copy size={20} />}
                        </motion.button>
                      </div>
                    </div>
                    
                    {selectedEstimate.status === 'draft' && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-md">
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
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowShareModal(false)}
                      className="px-4 py-2 border border-[var(--color-neutral)]/30 text-[var(--color-card-text)] rounded-md hover:bg-[var(--color-neutral)]/10"
                    >
                      Fechar
                    </motion.button>
                    {selectedEstimate.status === 'draft' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateStatus(selectedEstimate._id, 'sent')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-2"
                      >
                        <Send className="h-4 w-4" />
                        Marcar como Enviado
                      </motion.button>
                    )}
                    {selectedEstimate.clientEmail && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}