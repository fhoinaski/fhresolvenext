'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/lib/axios';
import toast from 'react-hot-toast';

import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { Loader2, ArrowLeft, Upload, X, Play, Tag } from 'lucide-react';

const videoSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  driveId: z.string().min(1, 'ID do Google Drive é obrigatório'),
  isBeforeAfter: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  order: z.number().int().default(0),
});

type VideoFormValues = z.infer<typeof videoSchema>;

export default function NewVideoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState<{ url: string; driveId: string; } | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      driveId: '',
      isBeforeAfter: false,
      isPublished: true,
      order: 0,
    },
  });

  const watchDriveId = watch('driveId');

  const onSubmit = async (data: VideoFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('/api/videos', {
        ...data,
        thumbnail,
      });
      
      toast.success('Vídeo adicionado com sucesso');
      router.push('/dashboard/videos');
    } catch (error) {
      console.error('Erro ao adicionar vídeo:', error);
      toast.error('Erro ao adicionar vídeo');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função simulada para upload de imagens para o Google Drive
  const handleThumbnailUpload = () => {
    // Simulando uma imagem do Google Drive
    const newThumbnail = {
      url: 'https://via.placeholder.com/800x450',
      driveId: `mockid-${Date.now()}`,
    };
    setThumbnail(newThumbnail);
  };

  const testDriveId = () => {
    if (watchDriveId) {
      setVideoPreview(`https://drive.google.com/file/d/${watchDriveId}/preview`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft size={20} />
        </button>
        <Heading title="Novo Vídeo" description="Adicione um novo vídeo ao site" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="space-y-4 p-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Título
                  </label>
                  <input
                    id="title"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o título do vídeo"
                    {...register('title')}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.description ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite uma descrição para o vídeo"
                    {...register('description')}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="driveId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ID do Google Drive
                  </label>
                  <div className="flex">
                    <input
                      id="driveId"
                      type="text"
                      className={`flex-1 px-3 py-2 border rounded-l-md dark:bg-gray-700 dark:text-white ${
                        errors.driveId ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Ex: 1Abc123DefG4HIjkL5m6N"
                      {...register('driveId')}
                    />
                    <button
                      type="button"
                      onClick={testDriveId}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Testar
                    </button>
                  </div>
                  {errors.driveId && (
                    <p className="mt-1 text-sm text-red-500">{errors.driveId.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    ID do vídeo no Google Drive. Ex: Na URL https://drive.google.com/file/d/1Abc123DefG4HIjkL5m6N/view, o ID é "1Abc123DefG4HIjkL5m6N".
                  </p>
                </div>
              </div>
            </Card>

            {videoPreview && (
              <Card>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Preview do Vídeo</h3>
                  <div className="relative pb-[56.25%] h-0 bg-black rounded-md overflow-hidden">
                    <iframe
                      src={videoPreview}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </Card>
            )}

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Thumbnail</h3>
                <div className="space-y-4">
                  {thumbnail ? (
                    <div className="relative rounded-md overflow-hidden">
                      <img
                        src={thumbnail.url}
                        alt="Thumbnail do vídeo"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setThumbnail(null)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleThumbnailUpload}
                      className="w-full h-48 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Upload size={24} className="text-gray-400" />
                      <span className="text-sm text-gray-500">Upload de Thumbnail</span>
                    </button>
                  )}
                  
                  <p className="text-sm text-gray-500">
                    Tamanho recomendado: 1280 x 720 pixels (16:9). Se não for fornecido, será gerado automaticamente.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Configurações</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Categoria
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Tag size={16} className="text-gray-400" />
                      </div>
                      <input
                        id="category"
                        type="text"
                        className={`pl-10 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                          errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Ex: Reformas, Instalações, etc."
                        {...register('category')}
                      />
                    </div>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Ordem de Exibição
                    </label>
                    <input
                      id="order"
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                      min="0"
                      step="1"
                      {...register('order', { valueAsNumber: true })}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Os vídeos são exibidos em ordem crescente (0 aparece primeiro)
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="isBeforeAfter"
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      {...register('isBeforeAfter')}
                    />
                    <label htmlFor="isBeforeAfter" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      É um vídeo "Antes/Depois"
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="isPublished"
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      {...register('isPublished')}
                    />
                    <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Publicar vídeo
                    </label>
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
                className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Salvando...
                  </div>
                ) : (
                  'Salvar'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}