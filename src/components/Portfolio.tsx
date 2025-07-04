import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Componente de comparação Antes/Depois
const BeforeAfterSlider: React.FC<{
  beforeImage: string;
  afterImage: string;
  title: string;
}> = ({ beforeImage, afterImage, title }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-64 rounded-xl overflow-hidden cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* Imagem Depois (fundo) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={`${title} - Depois`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Depois
        </div>
      </div>

      {/* Imagem Antes (overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={`${title} - Antes`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Antes
        </div>
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  category: string;
  details?: string;
  location?: string;
  duration?: string;
  price?: string;
}

const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    title: 'Instalação Elétrica Completa', 
    description: 'Sistema elétrico residencial em Jurerê Internacional.', 
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'elétrica',
    details: 'Instalação completa de rede elétrica residencial, incluindo tomadas, interruptores e pontos de iluminação. Modernização de quadro elétrico com disjuntores individuais.',
    location: 'Jurerê Internacional',
    duration: '3 dias',
    price: 'R$ 2.800'
  },
  { 
    id: 2, 
    title: 'Reparo Vazamento Emergencial', 
    description: 'Correção de vazamento em tubulação embutida.', 
    image: 'https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1597149959410-6e4832edb393?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'hidráulica',
    details: 'Identificação e correção de vazamento em tubulação embutida com reparo localizado. Teste de pressão e garantia de vedação.',
    location: 'Ratones',
    duration: '1 dia',
    price: 'R$ 450'
  },
  {
    id: 3,
    title: 'Montagem de Móveis Planejados',
    description: 'Montagem completa de armários e estantes.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'geral',
    details: 'Montagem profissional de móveis planejados com encaixe perfeito e acabamento impecável. Instalação de puxadores e dobradiças.',
    location: 'Centro',
    duration: '2 dias',
    price: 'R$ 600'
  },
  {
    id: 4,
    title: 'Reparo Sistema de Chuveiro',
    description: 'Substituição de resistência e regulagem de pressão.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    beforeImage: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'hidráulica',
    details: 'Substituição completa do sistema de chuveiro com nova resistência, regulador de pressão e teste de funcionamento.',
    location: 'Lagoa da Conceição',
    duration: '4 horas',
    price: 'R$ 280'
  }
];

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [filter, setFilter] = useState('todos');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedImage]);

  const filteredItems = filter === 'todos' ? portfolioItems : portfolioItems.filter((item) => item.category === filter);
  const categories = ['todos', 'elétrica', 'hidráulica', 'montagem', 'pintura'];

  const getGridCols = () => {
    if (windowWidth < 640) return 'grid-cols-1';
    if (windowWidth < 1024) return 'grid-cols-2';
    return 'grid-cols-3';
  };

  const toggleExpandItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-[#EDEDED]">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4">
            Trabalhos Realizados
          </span>
          <h2 className="section-title mb-4 text-[var(--color-text)]">Nosso Portfólio</h2>
          <p className="section-subtitle text-[var(--color-text)]/80">Conheça alguns dos nossos trabalhos recentes</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button 
              key={category} 
              onClick={() => setFilter(category)} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === category ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20' : 'bg-white text-[var(--color-text)] hover:bg-[var(--color-neutral)]/10 border border-[var(--color-neutral)]/30'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid do portfólio */}
        <div className={`grid ${getGridCols()} gap-6 sm:gap-8 md:gap-10`}>
          {filteredItems.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl shadow-lg border border-[var(--color-neutral)]/20">
              <p className="text-[var(--color-text)]/70">Nenhum item encontrado na categoria selecionada.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-[var(--color-neutral)]/20 cursor-pointer transition-all duration-500 ${expandedItem === item.id ? 'col-span-full md:col-span-2 md:row-span-2' : ''}`}
              >
                <div 
                  className={`relative overflow-hidden ${expandedItem === item.id ? 'aspect-auto' : 'aspect-[4/3]'}`}
                  onClick={() => {
                    if (windowWidth < 768) {
                      setSelectedItem(item);
                      setSelectedImage(item.image);
                    } else {
                      toggleExpandItem(item.id);
                    }
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/80 via-[var(--color-dark)]/20 to-transparent opacity-60 transition-opacity duration-300 z-10"></div>
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${expandedItem === item.id ? 'max-h-80 object-cover object-top' : ''}`}
                  />
                  <div className="absolute inset-0 bg-[var(--color-accent)]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-5"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-md">{item.title}</h3>
                    <p className="text-white/90 mb-3 drop-shadow-md">{item.description}</p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-accent)]/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                    {expandedItem === item.id ? (
                      <button className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[var(--color-accent)] rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-accent)]/10" onClick={(e) => { e.stopPropagation(); toggleExpandItem(item.id); }}>
                        Fechar
                      </button>
                    ) : (
                      <button className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors">
                        Ver detalhes
                      </button>
                    )}
                  </div>
                </div>
                {expandedItem === item.id && (
                  <div className="p-6 border-t border-[var(--color-neutral)]/20 space-y-6">
                    {/* Comparador Antes/Depois */}
                    {item.beforeImage && item.afterImage && (
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Comparação Antes/Depois</h4>
                        <BeforeAfterSlider
                          beforeImage={item.beforeImage}
                          afterImage={item.afterImage}
                          title={item.title}
                        />
                      </div>
                    )}

                    {/* Informações do Projeto */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Detalhes do Projeto</h4>
                        <p className="text-[var(--color-text)]/80 mb-4">{item.details}</p>
                        
                        {/* Specs do Projeto */}
                        <div className="space-y-2">
                          {item.location && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></span>
                              <span className="text-[var(--color-text)]/70">Localização: {item.location}</span>
                            </div>
                          )}
                          {item.duration && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="text-[var(--color-text)]/70">Duração: {item.duration}</span>
                            </div>
                          )}
                          {item.price && (
                            <div className="flex items-center gap-2 text-sm">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span className="text-[var(--color-text)]/70">Investimento: {item.price}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <a 
                          href="#contact" 
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-medium hover:bg-[var(--color-accent-dark)] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                        >
                          Solicitar Orçamento Similar
                        </a>
                        <button 
                          onClick={() => { setSelectedItem(item); setSelectedImage(item.image); }} 
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] rounded-xl font-medium hover:bg-[var(--color-accent)] hover:text-white transition-all hover:scale-105 active:scale-95"
                        >
                          Visualizar em Tela Cheia
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal de visualização */}
        {selectedImage && selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4" onClick={() => { setSelectedImage(null); setSelectedItem(null); }}>
            <button className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white backdrop-blur-md z-50 border border-white/20 hover:bg-white/20 active:scale-95 transition-all" onClick={() => { setSelectedImage(null); setSelectedItem(null); }} aria-label="Fechar">
              Fechar
            </button>
            <div className="relative max-w-5xl w-full flex flex-col items-center rounded-3xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <Image
                src={selectedImage}
                alt={selectedItem.title}
                width={1200}
                height={800}
                className="w-full max-h-[70vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="w-full bg-white/10 backdrop-blur-lg p-6 border-t border-white/20">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-white/90 mb-4">{selectedItem.description}</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent)]/80 text-white text-sm font-medium rounded-full">
                  {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}
                </span>
                {selectedItem.details && <p className="text-white/80 max-w-3xl">{selectedItem.details}</p>}
                <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors hover:scale-105 active:scale-95" onClick={(e) => e.stopPropagation()}>
                  Solicitar orçamento similar
                </a>
              </div>
              <div className="absolute inset-x-0 bottom-20 flex justify-between w-full h-24 sm:hidden">
                <div className="w-1/3 h-full" onClick={(e) => e.stopPropagation()}></div>
                <div className="w-1/3 h-full" onClick={(e) => e.stopPropagation()}></div>
                <div className="w-1/3 h-full" onClick={(e) => e.stopPropagation()}></div>
              </div>
            </div>
          </div>
        )}

        {filteredItems.length > 0 && (
          <div className="mt-16 text-center">
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors shadow-lg shadow-[var(--color-accent)]/20 hover:scale-105 hover:shadow-xl active:scale-95">
              Solicitar orçamento personalizado
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;