'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading } from '@/components/ui/Card';
import { Plus, Pencil, Trash2, Eye, EyeOff, Calendar, Tag, AlertTriangle, Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: {
    url: string;
    driveId: string;
  };
  isPublished: boolean;
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<BlogPost[]>('/api/blog');
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar posts do blog:', error);
      toast.error('Erro ao carregar posts do blog');
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(`/api/blog/${id}`, {
        isPublished: !currentStatus
      });
      toast.success(currentStatus ? 'Post ocultado' : 'Post publicado');
      fetchPosts();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status');
    }
  };

  const confirmDelete = (post: BlogPost) => {
    setSelectedPost(post);
    setShowDeleteConfirm(true);
  };

  const deletePost = async () => {
    if (!selectedPost) return;
    
    setDeleting(true);
    try {
      await axios.delete(`/api/blog/${selectedPost._id}`);
      toast.success('Post excluído com sucesso');
      setShowDeleteConfirm(false);
      fetchPosts();
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      toast.error('Erro ao excluir post');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Não publicado';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Blog" description="Gerencie os posts do blog" />
        <button
          onClick={() => router.push('/dashboard/blog/new')}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhum post do blog ainda</p>
            <button
              onClick={() => router.push('/dashboard/blog/new')}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Criar Primeiro Post
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Card key={post._id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 aspect-video md:aspect-square bg-gray-200 dark:bg-gray-700 relative">
                  {post.coverImage?.url ? (
                    <img
                      src={post.coverImage.url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Sem imagem
                    </div>
                  )}
                  {!post.isPublished && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                      Rascunho
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">
                      <Tag size={12} className="mr-1" />
                      {post.category}
                    </span>
                    {post.publishDate && (
                      <span className="inline-flex items-center text-xs bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded">
                        <Calendar size={12} className="mr-1" />
                        {formatDate(post.publishDate)}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2">{post.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Atualizado em {formatDate(post.updatedAt)}
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/dashboard/blog/${post._id}`)}
                        className="p-2 text-gray-500 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => confirmDelete(post)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button
                        onClick={() => togglePublishStatus(post._id, post.isPublished)}
                        className={`p-2 rounded-md ${
                          post.isPublished
                            ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                        title={post.isPublished ? 'Publicado' : 'Rascunho'}
                      >
                        {post.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && selectedPost && (
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
                Tem certeza que deseja excluir o post <strong>{selectedPost.title}</strong>? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={deletePost}
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
    </div>
  );
}