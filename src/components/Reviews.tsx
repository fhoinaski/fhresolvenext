'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, Heading } from '@/components/ui/Card';
import { Star, ThumbsUp, ThumbsDown, Plus, Copy, CheckCircle, Link as LinkIcon, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '@/lib/axios';

// Interface para tipagem da resposta da API
interface GenerateReviewResponse {
  message: string;
  reviewLink: string;
  reviewId: string;
}

interface Review {
  _id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  isApproved: boolean;
  createdAt: string;
  isTokenUsed: boolean;
}

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', location: '' });
  const [generatedLink, setGeneratedLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      toast.error('Erro ao carregar avaliações');
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (id: string) => {
    try {
      await api.post(`/api/reviews/${id}/approve`, { approve: true });
      toast.success('Avaliação aprovada com sucesso');
      fetchReviews();
    } catch (error) {
      console.error('Erro ao aprovar avaliação:', error);
      toast.error('Erro ao aprovar avaliação');
    }
  };

  const rejectReview = async (id: string) => {
    try {
      await api.post(`/api/reviews/${id}/approve`, { approve: false });
      toast.success('Avaliação rejeitada com sucesso');
      fetchReviews();
    } catch (error) {
      console.error('Erro ao rejeitar avaliação:', error);
      toast.error('Erro ao rejeitar avaliação');
    }
  };

  const generateReviewLink = async () => {
    if (!newReview.name || !newReview.location) {
      toast.error('Nome e localização são obrigatórios');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await api.post<GenerateReviewResponse>('/api/reviews/generate-token', {
        name: newReview.name,
        location: newReview.location,
      });

      if (!response.data.reviewLink) {
        throw new Error('Link não retornado pelo servidor');
      }

      setGeneratedLink(response.data.reviewLink);
      toast.success('Link gerado com sucesso');
    } catch (error: any) {
      console.error('Erro ao gerar link:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Erro ao gerar link de avaliação');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setLinkCopied(true);
    toast.success('Link copiado para a área de transferência');
    setTimeout(() => setLinkCopied(false), 3000);
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className={index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Avaliações" description="Gerencie as avaliações de clientes" />
        <button
          onClick={() => setShowGenerateModal(true)}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Gerar Link
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : reviews.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhuma avaliação ainda</p>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Gerar Link para Avaliação
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review._id} className={review.isTokenUsed ? '' : 'border-dashed border-amber-500'}>
              <div className="p-4">
                {!review.isTokenUsed ? (
                  <div className="text-center py-4">
                    <p className="font-medium mb-2">Link enviado para {review.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Aguardando cliente completar a avaliação
                    </p>
                    <div className="text-amber-500 animate-pulse flex items-center justify-center gap-2">
                      <LinkIcon size={16} />
                      <span className="text-sm">Link ativo</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{review.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{review.location}</p>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        review.isApproved
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {review.isApproved ? 'Aprovada' : 'Pendente'}
                      </div>
                    </div>
                    <div className="flex my-3">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                      "{review.text}"
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    {!review.isApproved && (
                      <div className="mt-4 flex justify-end space-x-2">
                        <button
                          onClick={() => rejectReview(review._id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                          title="Rejeitar"
                        >
                          <ThumbsDown size={16} />
                        </button>
                        <button
                          onClick={() => approveReview(review._id)}
                          className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                          title="Aprovar"
                        >
                          <ThumbsUp size={16} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal para gerar link de avaliação */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-medium mb-4">Gerar Link para Avaliação</h2>
              {generatedLink ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Link gerado com sucesso! Compartilhe com o cliente:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={generatedLink}
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
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setShowGenerateModal(false);
                        setGeneratedLink('');
                        setNewReview({ name: '', location: '' });
                        fetchReviews();
                      }}
                      className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md"
                    >
                      Concluir
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome do Cliente
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Digite o nome do cliente"
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Localização
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      placeholder="Ex: Jurerê, Florianópolis"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setShowGenerateModal(false);
                        setNewReview({ name: '', location: '' });
                      }}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={generateReviewLink}
                      disabled={isGenerating || !newReview.name || !newReview.location}
                      className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        'Gerar Link'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}