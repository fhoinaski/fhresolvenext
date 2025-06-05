'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  MessageCircle, 
  CheckCircle,
  Clock,
  Star,
  Search,
  Zap,
  Droplets,
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/motion-variants';

// Dados dos bairros e regiões atendidas - Expandido
const neighborhoods = [
  { 
    name: 'Ratones', 
    region: 'Norte da Ilha',
    primary: true,
    description: 'Sede principal • Atendimento completo',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '15-25 min',
    rating: 4.9,
    available: true,
    coordinates: [-27.5132, -48.4618]
  },
  { 
    name: 'Jurerê', 
    region: 'Norte da Ilha',
    description: 'Região nobre • Serviço especializado',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '20-30 min',
    rating: 4.8,
    available: true,
    coordinates: [-27.4278, -48.4978]
  },
  { 
    name: 'Daniela', 
    region: 'Norte da Ilha',
    description: 'Praia do norte • Atendimento rápido',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '25-35 min',
    rating: 4.7,
    available: true,
    coordinates: [-27.4158, -48.4798]
  },
  { 
    name: 'Canasvieiras', 
    region: 'Norte da Ilha',
    description: 'Centro turístico • 24h disponível',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '20-30 min',
    rating: 4.8,
    available: true,
    coordinates: [-27.4278, -48.4778]
  },
  { 
    name: 'Cachoeira do Bom Jesus', 
    region: 'Norte da Ilha',
    description: 'Região histórica • Atendimento especializado',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '25-35 min',
    rating: 4.6,
    available: true,
    coordinates: [-27.4658, -48.4558]
  },
  { 
    name: 'Ingleses', 
    region: 'Norte da Ilha',
    description: 'Praia dos ingleses • Serviço completo',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '30-40 min',
    rating: 4.7,
    available: true,
    coordinates: [-27.4358, -48.3958]
  },
  { 
    name: 'Rio Vermelho', 
    region: 'Norte da Ilha',
    description: 'Região residencial • Atendimento diário',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '25-35 min',
    rating: 4.6,
    available: true,
    coordinates: [-27.4858, -48.3458]
  },
  { 
    name: 'Santo Antônio', 
    region: 'Norte da Ilha',
    description: 'Região central • Acesso rápido',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '20-30 min',
    rating: 4.7,
    available: true,
    coordinates: [-27.4969, -48.4569]
  },
  { 
    name: 'Cacupé', 
    region: 'Norte da Ilha',
    description: 'Região residencial • Atendimento completo',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '25-35 min',
    rating: 4.6,
    available: true,
    coordinates: [-27.4869, -48.5075]
  },
  { 
    name: 'Sambaqui', 
    region: 'Norte da Ilha',
    description: 'Região tradicional • Serviço local',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '30-40 min',
    rating: 4.5,
    available: true,
    coordinates: [-27.4969, -48.5175]
  },
  { 
    name: 'João Paulo', 
    region: 'Norte da Ilha',
    description: 'Centro norte • Atendimento ágil',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '25-35 min',
    rating: 4.6,
    available: true,
    coordinates: [-27.5347, -48.5069]
  },
  { 
    name: 'Agronômica', 
    region: 'Centro',
    description: 'Região central • Acesso facilitado',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '35-45 min',
    rating: 4.8,
    available: true,
    coordinates: [-27.5969, -48.5200]
  },
  { 
    name: 'Vargem Grande', 
    region: 'Centro',
    description: 'Região metropolitana • Serviço completo',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '40-50 min',
    rating: 4.5,
    available: true,
    coordinates: [-27.6169, -48.5100]
  },
  { 
    name: 'Vargem Pequena', 
    region: 'Centro',
    description: 'Área residencial • Atendimento local',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '40-50 min',
    rating: 4.4,
    available: true,
    coordinates: [-27.6069, -48.5000]
  },
  { 
    name: 'Centro', 
    region: 'Centro',
    description: 'Centro da cidade • Atendimento comercial',
    services: ['Elétrica', 'Hidráulica'],
    responseTime: '45-55 min',
    rating: 4.5,
    available: true,
    coordinates: [-27.5969, -48.5482]
  }
];

const ServiceMap: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);

  // Filtrar bairros por região e termo de busca
  const filteredNeighborhoods = neighborhoods.filter(neighborhood => {
    const matchesRegion = selectedRegion === 'all' || neighborhood.region === selectedRegion;
    const matchesSearch = neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         neighborhood.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Obter regiões únicas
  const regions = ['all', ...Array.from(new Set(neighborhoods.map(n => n.region)))];

  // Estatísticas gerais
  const stats = {
    totalNeighborhoods: neighborhoods.length,
    averageRating: (neighborhoods.reduce((acc, n) => acc + n.rating, 0) / neighborhoods.length).toFixed(1),
    averageResponse: '30min'
  };

  return (
    <section id="areas" className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-white relative">
      <div className="container relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-blue-50 border border-blue-100 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MapPin className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 font-medium">
              Regiões Atendidas
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Onde Estamos
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Atendimento especializado em elétrica e hidráulica nas melhores regiões de Florianópolis
          </motion.p>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-3 gap-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                {stats.totalNeighborhoods}
              </div>
              <div className="text-sm text-gray-500">Bairros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                {stats.averageResponse}
              </div>
              <div className="text-sm text-gray-500">Resposta</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                {stats.averageRating}★
              </div>
              <div className="text-sm text-gray-500">Avaliação</div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filter Section */}
        <motion.div 
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar bairro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
                       outline-none transition-all duration-200 bg-white"
            />
          </div>

          {/* Region Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {regions.map((region) => (
              <motion.button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedRegion === region
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                }`}
                whileHover={!prefersReducedMotion ? { y: -1 } : {}}
                whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
              >
                {region === 'all' ? 'Todas as Regiões' : region}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Neighborhoods Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {filteredNeighborhoods.map((neighborhood, index) => (
              <motion.div
                key={neighborhood.name}
                className={`group relative bg-white rounded-xl border border-gray-200 
                          hover:border-blue-200 hover:shadow-lg transition-all duration-300 
                          overflow-hidden cursor-pointer ${
                            selectedNeighborhood === neighborhood.name ? 'ring-2 ring-blue-500 border-blue-500' : ''
                          }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={!prefersReducedMotion ? { y: -2 } : {}}
                onClick={() => setSelectedNeighborhood(
                  selectedNeighborhood === neighborhood.name ? null : neighborhood.name
                )}
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        neighborhood.primary 
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                          : 'bg-blue-50'
                      }`}>
                        <MapPin className={`h-5 w-5 ${
                          neighborhood.primary ? 'text-white' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {neighborhood.name}
                        </h3>
                        <span className="text-sm text-blue-600 font-medium">
                          {neighborhood.region}
                        </span>
                      </div>
                    </div>
                    
                    {neighborhood.primary && (
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 
                                   text-white text-xs font-medium">
                        Sede
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {neighborhood.description}
                  </p>

                  {/* Services Tags */}
                  <div className="flex gap-2 mb-4">
                    {neighborhood.services.map((service) => (
                      <div key={service} className="flex items-center gap-1 px-3 py-1 
                                                  bg-gray-50 rounded-full text-xs font-medium text-gray-700">
                        {service === 'Elétrica' ? (
                          <Zap className="h-3 w-3 text-yellow-500" />
                        ) : (
                          <Droplets className="h-3 w-3 text-blue-500" />
                        )}
                        {service}
                      </div>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{neighborhood.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">{neighborhood.rating}</span>
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">
                      Atendimento Disponível
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="https://wa.me/5548991919791"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 
                               bg-green-600 text-white font-medium rounded-lg 
                               hover:bg-green-700 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <a
                      href="tel:+5548991919791"
                      className="flex items-center justify-center gap-2 px-4 py-2 
                               border border-gray-300 text-gray-700 font-medium rounded-lg 
                               hover:bg-gray-50 transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="h-4 w-4" />
                      Ligar
                    </a>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-200">
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredNeighborhoods.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum bairro encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar os filtros ou termo de busca
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRegion('all');
                }}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg 
                         hover:bg-blue-700 transition-colors duration-200"
              >
                Limpar Filtros
              </button>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 rounded-2xl 
                        bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center">
                <Navigation className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">
                  Não encontrou seu bairro?
                </h3>
                <p className="text-gray-600">
                  Consulte disponibilidade em outras regiões
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5548991919791"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white 
                         font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200
                         shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                Consultar no WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+5548991919791"
                className="flex items-center gap-3 px-6 py-3 border-2 border-blue-600 
                         text-blue-600 font-semibold rounded-xl hover:bg-blue-50 
                         transition-all duration-200"
              >
                <Phone className="h-5 w-5" />
                Ligar Agora
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceMap;