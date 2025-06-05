import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck, Clock, Zap, Droplet, Wrench, CreditCard } from 'lucide-react';

// Interface para os serviços
interface BenefitProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  highlight: string;
}

const Benefits: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isDarkMode = false;
  // Dados dos serviços com design minimalista
  const benefitsData: BenefitProps[] = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: 'Confiabilidade',
      description: 'Serviços com garantia e profissionais qualificados.',
      highlight: 'Garantia Total',
      features: [
        'Garantia em todos os serviços',
        'Profissionais qualificados',
        'Materiais de qualidade',
        'Atendimento transparente'
      ]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Rapidez',
      description: 'Atendimento ágil com horários flexíveis, incluindo emergências.',
      highlight: 'Atendimento 24h',
      features: [
        'Agendamento flexível',
        'Atendimento emergencial',
        'Horários estendidos',
        'Resposta rápida'
      ]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Serviços Elétricos',
      description: 'Instalações e reparos elétricos completos com segurança.',
      highlight: 'Instalações Seguras',
      features: [
        'Instalação de tomadas e interruptores',
        'Montagem de lustres e luminárias',
        'Instalação de chuveiros elétricos',
        'Reparos em curtos-circuitos'
      ]
    },
    {
      icon: <Droplet className="h-6 w-6" />,
      title: 'Serviços Hidráulicos',
      description: 'Reparos e instalações hidráulicas com economia garantida.',
      highlight: 'Economia de Água',
      features: [
        'Reparo de vazamentos',
        'Desentupimento de pias e ralos',
        'Instalação de torneiras e chuveiros',
        'Manutenção de bombas d\'água'
      ]
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: 'Serviços Gerais',
      description: 'Montagem, reparos e manutenção para otimizar seus espaços.',
      highlight: 'Soluções Completas',
      features: [
        'Montagem de móveis',
        'Fixação de prateleiras e quadros',
        'Pequenos reparos em alvenaria',
        'Manutenção preventiva'
      ]
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: 'Parcelamento',
      description: 'Facilite seu pagamento com até 12x sem juros no cartão.',
      highlight: '12x Sem Juros',
      features: [
        'Parcelamento em até 12x sem juros',
        'Todos os cartões aceitos',
        'Desconto para pagamento à vista',
        'PIX e transferência'
      ]
    }
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
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    },
  };

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className={`py-16 sm:py-24 ${isDarkMode ? 'bg-[#3A3A3A]' : 'bg-[#EDEDED]'}`}
    >
      <div className="container">        {/* Header da seção */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-[var(--color-text)]'}`}>
            Soluções Profissionais
          </h2>
          <p className={`text-lg md:text-xl ${isDarkMode ? 'text-white/70' : 'text-[var(--color-text)]/70'} max-w-3xl mx-auto`}>
            Serviços especializados com garantia, rapidez e qualidade para sua casa ou empresa
          </p>
        </motion.div>

        {/* Grid de cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              className="group"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className={`relative overflow-hidden rounded-2xl p-8 h-full transition-all duration-500
                            ${isDarkMode ? 'bg-[#333333]' : 'bg-white'} 
                            border border-transparent
                            hover:border-[var(--color-accent)]/20
                            hover:shadow-2xl hover:shadow-[var(--color-accent)]/10`}>
                
                {/* Gradiente de fundo sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badge de destaque */}
                <div className="absolute top-6 right-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-medium">
                    {benefit.highlight}
                  </span>
                </div>

                {/* Conteúdo do card */}
                <div className="relative z-10">
                  {/* Ícone */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl 
                                bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-6
                                group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
                    {benefit.icon}
                  </div>

                  {/* Título e descrição */}
                  <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-[var(--color-text)]'}`}>
                    {benefit.title}
                  </h3>
                  
                  <p className={`${isDarkMode ? 'text-white/70' : 'text-[var(--color-text)]/70'} text-sm leading-relaxed mb-6`}>
                    {benefit.description}
                  </p>                  {/* Lista de recursos */}
                  <ul className="space-y-3">
                    {benefit.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 mt-0.5 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-[var(--color-text)]/80'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className={`inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl ${isDarkMode ? 'bg-[#333333]' : 'bg-white'} shadow-lg`}>
            <div className="text-center sm:text-left">
              <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-[var(--color-text)]'}`}>
                Pronto para começar?
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-white/70' : 'text-[var(--color-text)]/70'}`}>
                Solicite um orçamento gratuito e sem compromisso
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-medium hover:bg-[var(--color-accent)]/90 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Solicitar Orçamento
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;