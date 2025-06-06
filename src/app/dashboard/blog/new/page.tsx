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
import { Loader2, ArrowLeft, Upload, X, Calendar, Tag, Eye } from 'lucide-react';

// Schema de validação sem transformação para evitar conflitos de tipo
const blogSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  slug: z
    .string()
    .min(1, 'Slug é obrigatório')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  excerpt: z.string().min(1, 'Resumo é obrigatório').max(300, 'Resumo deve ter no máximo 300 caracteres'),
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  category: z.string().min(1, 'Categoria é obrigatória'),
  tags: z.string(), // Mantido como string para evitar conflitos de tipo
  isPublished: z.boolean().default(false),
  publishDate: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

// Interface para a imagem de capa
interface CoverImage {
  url: string;
  driveId: string;
}

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<CoverImage | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      category: '',
      tags: '',
      isPublished: false,
      publishDate: new Date().toISOString().split('T')[0],
    },
  });

  // Valores observados
  const watchedContent = watch('content');
  const watchedTitle = watch('title');
  const watchedExcerpt = watch('excerpt');
  const watchedCategory = watch('category');
  const watchedTags = watch('tags');

  // Função para processar tags como array para exibição
  const getTagsArray = (tagsString: string): string[] => {
    if (!tagsString) return [];
    return tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
  };

  // Submissão do formulário
  const onSubmit = async (data: BlogFormValues) => {
    setIsSubmitting(true);
    try {
      // Processar tags antes de enviar
      const processedData = {
        ...data,
        tags: getTagsArray(data.tags)
      };

      const response = await axios.post('/api/blog', { 
        ...processedData,
        coverImage 
      });
      
      toast.success('Post criado com sucesso');
      router.push('/dashboard/blog');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast.error('Erro ao criar post');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Geração automática de slug
  const generateSlug = (title: string): string =>
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  // Upload simulado de imagem
  const handleImageUpload = () => {
    const newImage: CoverImage = {
      url: 'https://via.placeholder.com/800x400',
      driveId: `mockid-${Date.now()}`,
    };
    setCoverImage(newImage);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Voltar"
          >
            <ArrowLeft size={20} />
          </button>
          <Heading title="Novo Post" description="Adicione um novo post ao blog" />
        </div>
        <button
          type="button"
          onClick={() => setPreviewMode(!previewMode)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Eye size={16} />
          {previewMode ? 'Editar' : 'Visualizar'}
        </button>
      </header>

      {previewMode ? (
        <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {coverImage && (
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-700">
              <img src={coverImage.url} alt={watchedTitle} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{watchedTitle || 'Título do Post'}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {watchedCategory && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs">
                  {watchedCategory}
                </span>
              )}
              {getTagsArray(watchedTags).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              {watchedExcerpt || 'Resumo do post...'}
            </p>
            <div className="prose dark:prose-invert max-w-none">
              {watchedContent ? (
                <div dangerouslySetInnerHTML={{ __html: watchedContent.replace(/\n/g, '<br />') }} />
              ) : (
                <p>Conteúdo do post...</p>
              )}
            </div>
          </div>
        </article>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="space-y-6 p-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Título
                  </label>
                  <input
                    id="title"
                    type="text"
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite o título do post"
                    {...register('title', {
                      onChange: (e) => {
                        const currentSlug = watch('slug');
                        if (!currentSlug) setValue('slug', generateSlug(e.target.value));
                      },
                    })}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Slug
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm">
                      /blog/
                    </span>
                    <input
                      id="slug"
                      type="text"
                      className={`flex-1 min-w-0 block w-full px-3 py-2 border rounded-none rounded-r-md dark:bg-gray-700 dark:text-white ${
                        errors.slug ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="titulo-do-post"
                      {...register('slug')}
                    />
                  </div>
                  {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    URL amigável para o post. Use apenas letras minúsculas, números e hífens.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="excerpt"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Resumo
                  </label>
                  <textarea
                    id="excerpt"
                    rows={2}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                      errors.excerpt ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Digite um breve resumo"
                    {...register('excerpt')}
                  />
                  {errors.excerpt && (
                    <p className="mt-1 text-sm text-red-500">{errors.excerpt.message}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Máximo de 300 caracteres. Esse texto aparecerá nos previews e compartilhamentos.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Conteúdo
                  </label>
                  <textarea
                    id="content"
                    rows={15}
                    className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white font-mono ${
                      errors.content ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Conteúdo do post em markdown ou HTML"
                    {...register('content')}
                  />
                  {errors.content && (
                    <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
                  )}
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Imagem de Capa</h3>
                {coverImage ? (
                  <div className="relative rounded-md overflow-hidden">
                    <img src={coverImage.url} alt="Imagem de capa" className="w-full h-48 object-cover" />
                    <button
                      type="button"
                      onClick={() => setCoverImage(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="w-full h-48 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Upload de Imagem de Capa</span>
                  </button>
                )}
                <p className="mt-4 text-sm text-gray-500">
                  Tamanho recomendado: 1200 x 630 pixels. Formatos suportados: JPG, PNG.
                </p>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Publicação</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="isPublished"
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      {...register('isPublished')}
                    />
                    <label
                      htmlFor="isPublished"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Publicar post
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="publishDate"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Data de Publicação
                    </label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="publishDate"
                        type="date"
                        className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                        {...register('publishDate')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Categorização</h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Categoria
                    </label>
                    <div className="relative">
                      <Tag size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        id="category"
                        type="text"
                        className={`pl-10 w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                          errors.category ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Ex: Dicas, Tutoriais, etc."
                        {...register('category')}
                      />
                    </div>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Tags (separadas por vírgula)
                    </label>
                    <input
                      id="tags"
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white ${
                        errors.tags ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Ex: reforma, dicas, residencial"
                      {...register('tags')}
                    />
                    {errors.tags && <p className="mt-1 text-sm text-red-500">{errors.tags.message}</p>}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Separe múltiplas tags com vírgulas
                    </p>
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
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Salvando...
                  </div>
                ) : (
                  'Salvar'
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}