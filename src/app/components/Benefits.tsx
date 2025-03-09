import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, Zap, Droplet, Wrench, CreditCard, ArrowRight, X, ChevronRight, MapPin, Navigation, AlertTriangle } from 'lucide-react';

// Interface para os detalhes dos serviços
interface ServiceDetailsProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: {
    features: string[];
    benefits: string[];
    pricing: {
      basePrice: string;
      additionalInfo?: string;
    };
  };
}

// Coordenadas de Ratones, Florianópolis
const RATONES_COORDS = {
  lat: -27.5132, 
  lng: -48.4618
};

// Raio de cobertura sem taxa adicional (em km)
const COVERAGE_RADIUS = 20;

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedService, setSelectedService] = useState<ServiceDetailsProps | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isCheckingLocation, setIsCheckingLocation] = useState(false);

  // Detectar dispositivo móvel
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Calcular distância entre dois pontos em km (fórmula de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distância em km
    return Math.round(distance * 10) / 10; // Arredondar para uma casa decimal
  };

  // Obter localização do usuário
  const getUserLocation = () => {
    setIsCheckingLocation(true);
    setLocationError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userCoords);
          
          // Calcular distância até Ratones
          const dist = calculateDistance(
            userCoords.lat, userCoords.lng,
            RATONES_COORDS.lat, RATONES_COORDS.lng
          );
          
          setDistance(dist);
          setIsCheckingLocation(false);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setLocationError("Não foi possível obter sua localização. Verifique as permissões do navegador.");
          setIsCheckingLocation(false);
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError("Geolocalização não é suportada pelo seu navegador.");
      setIsCheckingLocation(false);
    }
  };

  // Dados expandidos para cada serviço com valores corrigidos
  const benefitsData = [
    { 
      icon: <ShieldCheck className="h-7 w-7" />, 
      title: 'Confiabilidade', 
      description: 'Serviços com garantia.',
      details: {
        features: ['Garantia em todos os serviços executados', 'Profissionais qualificados e experientes', 'Atendimento ético e transparente'],
        benefits: ['Tranquilidade na contratação', 'Garantia de até 90 dias para serviços realizados', 'Compromisso com a qualidade'],
        pricing: {
          basePrice: 'R$ 150,00',
          additionalInfo: 'Valor mínimo para áreas até 20km de Ratones'
        }
      }
    },
    { 
      icon: <Clock className="h-7 w-7" />, 
      title: 'Rapidez', 
      description: 'Atendimento ágil.',
      details: {
        features: ['Resposta rápida em até 1 hora', 'Agendamento flexível', 'Atendimento de emergência disponível'],
        benefits: ['Solução rápida para seus problemas', 'Economia de tempo', 'Redução do tempo de espera'],
        pricing: {
          basePrice: 'R$ 150,00',
          additionalInfo: 'Taxa adicional para atendimentos emergenciais'
        }
      }
    },
    { 
      icon: <Zap className="h-7 w-7" />, 
      title: 'Serviços Elétricos', 
      description: 'Soluções completas.',
      details: {
        features: ['Instalação de tomadas e interruptores', 'Montagem de lustres e luminárias', 'Instalação de chuveiros elétricos', 'Reparos em curtos-circuitos'],
        benefits: ['Segurança para sua residência', 'Economia de energia', 'Prevenção de acidentes'],
        pricing: {
          basePrice: 'A partir de R$ 150,00',
          additionalInfo: 'Valor pode variar conforme complexidade'
        }
      }
    },
    { 
      icon: <Droplet className="h-7 w-7" />, 
      title: 'Serviços Hidráulicos', 
      description: 'Reparos e instalações.',
      details: {
        features: ['Reparo de vazamentos', 'Desentupimento de pias e ralos', 'Instalação de torneiras e chuveiros', 'Troca de registros e válvulas'],
        benefits: ['Economia na conta de água', 'Prevenção de infiltrações', 'Aumento da vida útil das instalações'],
        pricing: {
          basePrice: 'A partir de R$ 150,00',
          additionalInfo: 'Valor pode variar conforme complexidade'
        }
      }
    },
    { 
      icon: <Wrench className="h-7 w-7" />, 
      title: 'Serviços Gerais', 
      description: 'Montagem e reparos.',
      details: {
        features: ['Montagem de móveis', 'Fixação de prateleiras e quadros', 'Pequenos reparos em alvenaria', 'Instalação de persianas e cortinas'],
        benefits: ['Otimização dos espaços', 'Acabamento de qualidade', 'Praticidade no dia a dia'],
        pricing: {
          basePrice: 'A partir de R$ 150,00',
          additionalInfo: 'Valor pode variar conforme complexidade do serviço'
        }
      }
    },
    { 
      icon: <CreditCard className="h-7 w-7" />, 
      title: 'Parcelamento', 
      description: 'Até 12x sem juros.',
      details: {
        features: ['Parcelamento em até 12x sem juros', 'Aceitamos todos os cartões', 'Desconto para pagamento à vista', 'Transferência via PIX'],
        benefits: ['Flexibilidade de pagamento', 'Planejamento financeiro', 'Solução imediata sem comprometer o orçamento'],
        pricing: {
          basePrice: 'R$ 150,00',
          additionalInfo: 'Valor mínimo para parcelamento'
        }
      }
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Bloquear scroll do body quando o modal está aberto
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  // Modal de detalhes do serviço com melhor responsividade
  const ServiceDetailsModal: React.FC<{ service: ServiceDetailsProps, onClose: () => void }> = ({ service, onClose }) => (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop com efeito de blur */}
      <motion.div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Conteúdo do modal */}
      <motion.div 
        className="bg-[var(--color-card-bg)] rounded-lg shadow-xl w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-accent) transparent'
        }}
      >
        {/* Cabeçalho estilizado */}
        <div className="sticky top-0 bg-[var(--color-card-bg)] z-10 border-b border-[var(--color-neutral)]/20">
          <div className="relative px-4 py-5 sm:p-6">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-accent)]/10 rounded-full" />
            <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--color-accent)]/20 rounded-full" />
            
            <button 
              onClick={onClose} 
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-[var(--color-neutral)]/10 hover:bg-[var(--color-neutral)]/20 transition-colors z-20"
              aria-label="Fechar"
            >
              <X size={18} className="text-[var(--color-text)]" />
            </button>
            
            <div className="flex items-center gap-3 sm:gap-4 relative">
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex-shrink-0">
                {service.icon}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold card-text">{service.title}</h3>
                <p className="text-[var(--color-card-text)]/80 text-sm sm:text-base">{service.description}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Corpo do modal com detalhes */}
        <div className="px-4 py-3 sm:px-6 sm:pb-6">
          {/* Recursos */}
          <div className="mb-5">
            <h4 className="text-base sm:text-lg font-medium card-text flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                <ChevronRight size={14} />
              </span>
              Recursos
            </h4>
            <ul className="space-y-2">
              {service.details.features.map((feature, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <span className="w-5 h-5 mt-0.5 rounded-full flex-shrink-0 bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  <span className="card-text-secondary text-sm sm:text-base">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Benefícios */}
          <div className="mb-5">
            <h4 className="text-base sm:text-lg font-medium card-text flex items-center gap-2 mb-3">
              <span className="w-5 h-5 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                <ChevronRight size={14} />
              </span>
              Benefícios
            </h4>
            <ul className="space-y-2">
              {service.details.benefits.map((benefit, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx + 0.2 }}
                >
                  <span className="w-5 h-5 mt-0.5 rounded-full flex-shrink-0 bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </span>
                  <span className="card-text-secondary text-sm sm:text-base">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Área de cobertura com verificação de localização */}
          <motion.div 
            className="p-3 sm:p-4 bg-[var(--color-neutral)]/10 rounded-lg mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
                  <span className="font-medium card-text text-sm sm:text-base">Área de Cobertura</span>
                </div>
                <button 
                  onClick={getUserLocation}
                  disabled={isCheckingLocation}
                  className="text-xs sm:text-sm px-2 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded hover:bg-[var(--color-accent)]/20 transition-colors flex items-center gap-1"
                >
                  {isCheckingLocation ? 'Verificando...' : 'Verificar distância'}
                  <Navigation className="h-3 w-3" />
                </button>
              </div>
              
              <div className="text-sm">
                <p className="card-text-secondary">Até 20km de Ratones, Florianópolis</p>
                
                {locationError && (
                  <div className="mt-2 text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-md flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-xs">{locationError}</span>
                  </div>
                )}
                
                {distance !== null && (
                  <div className={`mt-2 p-2 rounded-md flex items-start gap-2 ${
                    distance <= COVERAGE_RADIUS 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                      : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    <span className="text-xs flex items-center gap-1">
                      <span className="font-medium">Sua localização:</span> {distance} km de Ratones
                      {distance <= COVERAGE_RADIUS 
                        ? ' (dentro da área de cobertura)'
                        : ` (${(distance - COVERAGE_RADIUS).toFixed(1)}km além da área de cobertura padrão)`
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Preços */}
          <motion.div 
            className="p-3 sm:p-4 bg-[var(--color-accent)]/5 rounded-lg mb-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <CreditCard className="h-5 w-5 text-[var(--color-accent)]" />
              <span className="font-medium card-text text-sm sm:text-base">Valor</span>
            </div>
            <div className="card-text-secondary text-sm sm:text-base text-right">
              <div className="font-medium">
                {service.details.pricing.basePrice}
                {distance !== null && distance > COVERAGE_RADIUS && (
                  <span className="text-amber-500 dark:text-amber-400">
                    {' + taxa adicional por distância'}
                  </span>
                )}
              </div>
              {service.details.pricing.additionalInfo && (
                <div className="text-xs sm:text-sm opacity-80">{service.details.pricing.additionalInfo}</div>
              )}
            </div>
          </motion.div>
          
          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.a
              href="#contact"
              className="flex-1 text-center py-3 px-4 bg-[var(--color-accent)] text-white rounded-md font-medium hover:bg-[var(--color-accent-dark)] transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={onClose}
            >
              Solicitar Orçamento
            </motion.a>
            
            <motion.button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-[var(--color-neutral)]/30 rounded-md font-medium hover:bg-[var(--color-neutral)]/10 transition-colors card-text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Fechar
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section 
      id="benefits" 
      ref={sectionRef} 
      className="py-16 sm:py-20 bg-[var(--color-gray)] dark:bg-[var(--color-gray)]"
    >
      <div className="container">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4">
            Nossos Serviços
          </span>
          <h2 className="section-title mb-4">Soluções Completas</h2>
          <p className="section-subtitle">O que podemos fazer por você</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              className="relative z-10 overflow-hidden group"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="card h-full flex flex-col dark:bg-[var(--color-card-bg)] transition-all duration-500 
                            border-2 border-transparent group-hover:border-[var(--color-accent)]/20">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent)]/5 rounded-bl-full -z-10 
                              group-hover:w-full group-hover:h-full group-hover:rounded-none transition-all duration-500"></div>
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full 
                                bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-5
                                group-hover:bg-[var(--color-accent)]/20 transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3 card-text">{benefit.title}</h3>
                  <p className="text-[var(--color-secondary)] mb-5">{benefit.description}</p>
                  <div className="mt-auto pt-4">
                    <motion.button
                      onClick={() => setSelectedService(benefit)}
                      className="inline-flex items-center text-[var(--color-accent)] text-sm font-medium"
                      whileHover={{ x: 5 }}
                    >
                      Saiba mais
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-md font-medium hover:bg-[var(--color-accent)]/90 transition-all shadow-md"
          >
            Solicitar Orçamento
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Modal de detalhes */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDetailsModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Benefits;