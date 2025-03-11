'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Heading } from '@/components/ui/Card';
import { Plus, Pencil, Trash2, Eye, EyeOff, Play, Tag, AlertTriangle, Loader2 } from 'lucide-react';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

interface Video {
  _id: string;
  title: string;
  description: string;
  category: string;
  driveId: string;
  thumbnail?: {
    url: string;
    driveId: string;
  };
  isBeforeAfter: boolean;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function VideosPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Video[]>('/api/videos');
      setVideos(response.data);
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
      toast.error('Erro ao carregar vídeos');
    } finally {
      setLoading(false);
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      await axios.patch(`/api/videos/${id}`, {
        isPublished: !currentStatus
      });
      toast.success(currentStatus ? 'Vídeo ocultado' : 'Vídeo publicado');
      fetchVideos();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      toast.error('Erro ao alterar status');
    }
  };

  const confirmDelete = (video: Video) => {
    setSelectedVideo(video);
    setShowDeleteConfirm(true);
  };

  const deleteVideo = async () => {
    if (!selectedVideo) return;
    
    setDeleting(true);
    try {
      await axios.delete(`/api/videos/${selectedVideo._id}`);
      toast.success('Vídeo excluído com sucesso');
      setShowDeleteConfirm(false);
      fetchVideos();
    } catch (error) {
      console.error('Erro ao excluir vídeo:', error);
      toast.error('Erro ao excluir vídeo');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Heading title="Vídeos" description="Gerencie os vídeos do site" />
        <button
          onClick={() => router.push('/dashboard/videos/new')}
          className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={16} />
          Novo Vídeo
        </button>
        </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : videos.length === 0 ? (
        <Card>
          <div className="py-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Nenhum vídeo ainda</p>
            <button
              onClick={() => router.push('/dashboard/videos/new')}
              className="bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-md inline-flex items-center gap-2"
            >
              <Plus size={16} />
              Adicionar Primeiro Vídeo
            </button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video._id} className="overflow-hidden flex flex-col">
              <div className="aspect-video relative bg-gray-200 dark:bg-gray-700 cursor-pointer" onClick={() => setPreviewVideo(video)}>
                {video.thumbnail?.url ? (
                  <img
                    src={video.thumbnail.url}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Sem thumbnail
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors">
                  <Play size={48} className="text-white" />
                </div>
                {!video.isPublished && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
                    Não publicado
                  </div>
                )}
                {video.isBeforeAfter && (
                  <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                    Antes/Depois
                  </div>
                )}
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded">
                    <Tag size={12} className="mr-1" />
                    {video.category}
                  </span>
                </div>
                <h3 className="text-lg font-medium mb-2">{video.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => router.push(`/dashboard/videos/${video._id}`)}
                      className="p-2 text-gray-500 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      title="Editar"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => confirmDelete(video)}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => togglePublishStatus(video._id, video.isPublished)}
                    className={`p-2 rounded-md ${
                      video.isPublished
                        ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                        : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    title={video.isPublished ? 'Publicado' : 'Não publicado'}
                  >
                    {video.isPublished ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && selectedVideo && (
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
                Tem certeza que deseja excluir o vídeo <strong>{selectedVideo.title}</strong>? Esta ação não pode ser desfeita.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={deleteVideo}
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

      {/* Modal de preview do vídeo */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setPreviewVideo(null)}>
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="relative pb-[56.25%] h-0 bg-black">
              <iframe
                src={`https://drive.google.com/file/d/${previewVideo.driveId}/preview`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg">
              <h3 className="text-lg font-medium mb-2">{previewVideo.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{previewVideo.description}</p>
              <button
                onClick={() => setPreviewVideo(null)}
                className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-gray-200"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}