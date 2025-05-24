'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  isPublished: boolean;
  images: { url: string; driveId: string; caption: string }[];
}

export default function PortfolioPage() {
  const router = useRouter();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/portfolio');
      setPortfolioItems(response.data);
    } catch (error) {
      console.error('Erro ao buscar itens do portfólio:', error);
      toast.error('Erro ao carregar portfólio');
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(`/api/portfolio/${id}`, {
        isPublished: !currentStatus
      });
      toast.success(currentStatus ? 'Item ocultado' : 'Item publicado');
      fetchPortfolioItems();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status');
    }
  };

  const deletePortfolioItem = async (id: string) => {
    try {
      await axios.delete(`/api/portfolio/${id}`);
      toast.success('Item excluído com sucesso');
      fetchPortfolioItems();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      toast.error('Erro ao excluir item');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Portfólio" description="Gerencie os itens do portfólio" />
        <button
          onClick={() => router.push('/dashboard/portfolio/new')}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Item
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : portfolioItems.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhum item no portfólio ainda</p>
            <button
              onClick={() => router.push('/dashboard/portfolio/new')}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Adicionar Primeiro Item
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <Card key={item._id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative bg-gray-200 dark:bg-gray-700">
                {item.images?.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Sem imagem
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(item.category)}`}>
                    {formatCategory(item.category)}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-medium line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{formatDate(item.date)}</span>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/dashboard/portfolio/${item._id}`)}
                    className="p-2 text-gray-500 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    title="Editar"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deletePortfolioItem(item._id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <button
                  onClick={() => togglePublishStatus(item._id, item.isPublished)}
                  className={`p-2 rounded-md ${
                    item.isPublished
                      ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                      : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={item.isPublished ? 'Publicado' : 'Oculto'}
                >
                  {item.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Funções auxiliares
function getCategoryColor(category: string): string {
  switch (category) {
    case 'elétrica':
      return 'bg-yellow-500 text-white';
    case 'hidráulica':
      return 'bg-blue-500 text-white';
    case 'montagem':
      return 'bg-purple-500 text-white';
    case 'pintura':
      return 'bg-red-500 text-white';
    case 'geral':
    default:
      return 'bg-gray-500 text-white';
  }
}

function formatCategory(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  } catch (error) {
    return dateString;
  }
}
