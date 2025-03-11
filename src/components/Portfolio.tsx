import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Filter, X, ChevronLeft, ChevronRight, ExternalLink, MapPin, Tag, Calendar } from 'lucide-react';
import Image from 'next/image';

// Interface para os itens do portfólio
interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  location?: string;
  date?: string;
  details?: string;
}

const portfolioItems: PortfolioItem[] = [
  { 
    id: 1, 
    title: 'Instalação Elétrica', 
    description: 'Tomadas e interruptores em Jurerê.', 
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'elétrica',
    location: 'Jurerê',
    date: 'Março 2025',
    details: 'Instalação completa de rede elétrica residencial, incluindo tomadas, interruptores e pontos de iluminação.'
  },
  { 
    id: 2, 
    title: 'Reparo Hidráulico', 
    description: 'Conserto de vazamento em Ratones.', 
    image: 'https://images.unsplash.com/photo-1585704032915-c3400305e979?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 
    category: 'hidráulica',
    location: 'Ratones',
    date: 'Fevereiro 2025',
    details: 'Identificação e correção de vazamento em tubulação embutida.'
  },
  // ... outros itens permanecem iguais
];

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [filter, setFilter] = useState('todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedImage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isFilterOpen &&
        filterDropdownRef.current &&
        filterButtonRef.current &&
        !filterDropdownRef.current.contains(event.target as Node) &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  const filteredItems = filter === 'todos' ? portfolioItems : portfolioItems.filter((item) => item.category === filter);
  const categories = ['todos', 'elétrica', 'hidráulica', 'montagem', 'pintura'];

  const navigateGallery = (direction: 'next' | 'prev') => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[newIndex]);
    setSelectedImage(filteredItems[newIndex].image);
  };

  const getGridCols = () => {
    if (windowWidth < 640) return 'grid-cols-1';
    if (windowWidth < 1024) return 'grid-cols-2';
    return 'grid-cols-3';
  };

  const toggleExpandItem = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  const handleCategorySelect = (category: string) => {
    setFilter(category);
    setIsFilterOpen(false);
    setExpandedItem(null);
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)]">
      <div className="container">
        <div className="text-center mb-12">
          <motion.span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Trabalhos Realizados
          </motion.span>
          <motion.h2 className="section-title mb-4 text-[var(--color-text)]" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            Nosso Portfólio
          </motion.h2>
          <motion.p className="section-subtitle text-[var(--color-text)]/80" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            Conheça alguns dos nossos trabalhos recentes
          </motion.p>

          {/* Filtro */}
          <motion.div className="relative mb-10 z-30" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
            <div className="md:hidden">
              <motion.button ref={filterButtonRef} onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center justify-center gap-2 mx-auto px-5 py-2.5 rounded-full bg-[var(--color-accent)] text-white font-medium shadow-lg shadow-[var(--color-accent)]/20" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Filter className="h-4 w-4" />
                <span>Filtrar: {filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
              </motion.button>
              {isFilterOpen && <div className="fixed inset-0 bg-transparent z-20" onClick={() => setIsFilterOpen(false)} />}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div ref={filterDropdownRef} className="absolute z-30 mt-3 p-3 w-64 left-1/2 transform -translate-x-1/2 bg-[var(--color-card-bg)] rounded-2xl shadow-xl border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20 backdrop-blur-sm" initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }}>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <motion.button key={category} onClick={() => handleCategorySelect(category)} className={`block w-full text-left px-4 py-3 rounded-xl text-sm ${filter === category ? 'bg-[var(--color-accent)] text-white font-medium shadow-md shadow-[var(--color-accent)]/20' : 'hover:bg-[var(--color-accent)]/10 card-text transition-colors'}`} whileHover={{ x: 3 }}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="hidden md:flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <motion.button key={category} onClick={() => handleCategorySelect(category)} className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all ${filter === category ? 'bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/20' : 'bg-[var(--color-card-bg)] text-[var(--color-text)] hover:bg-[var(--color-neutral)]/10 border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/10'}`} whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  {filter === category && <motion.span className="absolute inset-0 rounded-full bg-[var(--color-accent)]" layoutId="activeCategory" style={{ zIndex: -1 }} />}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Grid de portfólio */}
          <LayoutGroup>
            <motion.div className={`grid ${getGridCols()} gap-6 sm:gap-8 md:gap-10`} layout>
              <AnimatePresence mode="popLayout">
                {filteredItems.length === 0 ? (
                  <motion.div className="col-span-full py-16 text-center bg-[var(--color-card-bg)] rounded-2xl shadow-lg border border-[var(--color-neutral)]/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="text-[var(--color-text)]/70">Nenhum item encontrado na categoria selecionada.</p>
                  </motion.div>
                ) : (
                  filteredItems.map((item) => (
                    <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ duration: 0.4 }} className={`bg-[var(--color-card-bg)] rounded-2xl overflow-hidden shadow-lg border border-[var(--color-neutral)]/20 dark:border-[var(--color-neutral)]/10 cursor-pointer transition-all duration-500 ${expandedItem === item.id ? 'col-span-full md:col-span-2 md:row-span-2' : ''}`}>
                      <div className={`relative overflow-hidden ${expandedItem === item.id ? 'aspect-auto' : 'aspect-[4/3]'}`} onClick={() => {
                        if (!isFilterOpen) {
                          if (windowWidth < 768) {
                            setSelectedItem(item);
                            setSelectedImage(item.image);
                          } else {
                            toggleExpandItem(item.id);
                          }
                        }
                      }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)]/80 via-[var(--color-dark)]/20 to-transparent opacity-60 transition-opacity duration-300 z-10"></div>
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          width={800}  // Adicionado
                          height={600} // Adicionado
                          className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${expandedItem === item.id ? 'max-h-80 object-cover object-top' : ''}`}
                          loading="lazy" 
                        />
                        <div className="absolute inset-0 bg-[var(--color-accent)]/10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-5"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-md">{item.title}</h3>
                          <p className="text-white/90 mb-3 drop-shadow-md">{item.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--color-accent)]/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                              <Tag size={12} /> {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                            {item.location && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm"><MapPin size={12} /> {item.location}</span>}
                            {item.date && <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm"><Calendar size={12} /> {item.date}</span>}
                          </div>
                          {expandedItem === item.id ? (
                            <motion.button className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[var(--color-accent)] rounded-full text-sm font-medium transition-colors hover:bg-[var(--color-accent)]/10" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={(e) => { e.stopPropagation(); toggleExpandItem(item.id); }}>
                              <X size={14} /> Fechar
                            </motion.button>
                          ) : (
                            <motion.button className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm hover:bg-white/30 transition-colors" whileHover={{ scale: 1.05, x: 3 }} whileTap={{ scale: 0.95 }}>
                              Ver detalhes <ExternalLink size={14} />
                            </motion.button>
                          )}
                        </div>
                      </div>
                      <AnimatePresence>
                        {expandedItem === item.id && (
                          <motion.div className="p-6 border-t border-[var(--color-neutral)]/20" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                            <h4 className="text-lg font-semibold mb-3 text-[var(--color-text)]">Detalhes do Projeto</h4>
                            <p className="text-[var(--color-text)]/80 mb-6">{item.details}</p>
                            <div className="flex flex-wrap gap-3">
                              <motion.a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors shadow-md" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                Solicitar orçamento similar
                              </motion.a>
                              <motion.button onClick={() => { setSelectedItem(item); setSelectedImage(item.image); }} className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-neutral)]/10 text-[var(--color-text)] rounded-full font-medium hover:bg-[var(--color-neutral)]/20 transition-colors" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                Ampliar imagem
                              </motion.button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filteredItems.length > 0 && (
            <motion.div className="mt-16" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}>
              <motion.a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors shadow-lg shadow-[var(--color-accent)]/20" whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(var(--color-accent-rgb), 0.4)" }} whileTap={{ scale: 0.97 }}>
                Solicitar orçamento personalizado
              </motion.a>
            </motion.div>
          )}
        </div>

        {/* Modal de visualização */}
        <AnimatePresence>
          {selectedImage && selectedItem && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setSelectedImage(null); setSelectedItem(null); }}>
              <motion.button className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white backdrop-blur-md z-50 border border-white/20" whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={() => { setSelectedImage(null); setSelectedItem(null); }} aria-label="Fechar">
                <X className="h-5 w-5" />
              </motion.button>
              {filteredItems.length > 1 && (
                <>
                  <motion.button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white backdrop-blur-md z-40 hidden sm:flex border border-white/20" whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }} aria-label="Imagem anterior">
                    <ChevronLeft className="h-5 w-5" />
                  </motion.button>
                  <motion.button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white backdrop-blur-md z-40 hidden sm:flex border border-white/20" whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }} aria-label="Próxima imagem">
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </>
              )}
              <motion.div className="relative max-w-5xl w-full flex flex-col items-center rounded-3xl overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <Image
                  src={selectedImage}
                  alt={selectedItem.title}
                  width={1200} // Ajustado para modal
                  height={800} // Ajustado para modal
                  className="w-full max-h-[70vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <motion.div className="w-full bg-white/10 backdrop-blur-lg p-6 border-t border-white/20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedItem.title}</h3>
                  <p className="text-white/90 mb-4">{selectedItem.description}</p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-accent)]/80 text-white text-sm font-medium rounded-full"><Tag size={14} /> {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}</span>
                    {selectedItem.location && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full"><MapPin size={14} /> {selectedItem.location}</span>}
                    {selectedItem.date && <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 text-white text-sm font-medium rounded-full"><Calendar size={14} /> {selectedItem.date}</span>}
                  </div>
                  {selectedItem.details && <p className="text-white/80 max-w-3xl">{selectedItem.details}</p>}
                  <motion.a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[var(--color-accent)] text-white rounded-full font-medium hover:bg-[var(--color-accent-dark)] transition-colors" whileHover={{ scale: 1.05, x: 3 }} whileTap={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()}>
                    Solicitar orçamento similar
                  </motion.a>
                </motion.div>
                <div className="absolute inset-x-0 bottom-20 flex justify-between w-full h-24 sm:hidden">
                  <div className="w-1/3 h-full" onClick={(e) => { e.stopPropagation(); navigateGallery('prev'); }}></div>
                  <div className="w-1/3 h-full" onClick={(e) => e.stopPropagation()}></div>
                  <div className="w-1/3 h-full" onClick={(e) => { e.stopPropagation(); navigateGallery('next'); }}></div>
                </div>
                <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex gap-3 sm:hidden">
                  {filteredItems.length > 1 && <span className="text-white/70 text-xs backdrop-blur-md bg-black/20 px-2 py-1 rounded-full">Deslize para navegar</span>}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;