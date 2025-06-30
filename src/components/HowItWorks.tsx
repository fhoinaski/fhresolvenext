'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  MessageSquare, 
  CalendarCheck, 
  Wrench, 
  CheckCircle, 
  ArrowRight,
  Phone,
  MapPin
} from 'lucide-react';
import WhatsAppModal from './WhatsAppModal';

interface ProcessStep {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string[];
  color: string;
}

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const processSteps: ProcessStep[] = [
    {
      id: 1,
      icon: <MessageSquare className="h-8 w-8" />,
      title: 'Entre em Contato',
      description: 'Fale conosco pelo WhatsApp ou preencha nosso formulário',
      details: [
        'Atendimento imediato via WhatsApp',
        'Orçamento gratuito e sem compromisso',
        'Especialistas Alexandre e Fernando',
        'Tire todas suas dúvidas'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: <CalendarCheck className="h-8 w-8" />,
      title: 'Agendamento',
      description: 'Marcamos a visita técnica no melhor horário para você',
      details: [
        'Horários flexíveis, até nos finais de semana',       
        'Avaliação completa do problema',
        'Orçamento detalhado'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      icon: <Wrench className="h-8 w-8" />,
      title: 'Execução',
      description: 'Realizamos o serviço com qualidade e rapidez',
      details: [
        'Materiais de primeira qualidade',
        'Técnicos especializados',
        'Limpeza completa após o serviço',
        'Explicação detalhada do que foi feito'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 4,
      icon: <CheckCircle className="h-8 w-8" />,
      title: 'Garantia',
      description: 'Serviço finalizado com garantia total e sua satisfação',
      details: [
        'Garantia em todos os serviços',
        'Suporte pós-atendimento',
        'Teste de funcionamento',
        'Cliente 100% satisfeito'
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const connectLineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-white relative overflow-hidden"
    >
      {/* Background Pattern - Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' fill='none' stroke='%230099ff' stroke-width='1'/><path d='M0 40 H80 M40 0 V80' stroke='%230099ff' stroke-width='0.5'/></svg>")`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-3 h-3 bg-[var(--color-accent)]/20 rounded-full animate-pulse" />
      <div className="absolute bottom-32 left-16 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-[var(--color-accent)]/25 rounded-full animate-pulse delay-500" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold mb-6 border border-[var(--color-accent)]/20">
            <Wrench className="h-4 w-4 mr-2" />
            Processo Simples
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text)]">
            Como{' '}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-blue-600 text-transparent bg-clip-text">
              Funciona
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-[var(--color-text)]/70 max-w-3xl mx-auto leading-relaxed">
            Nosso processo é simples, rápido e transparente. Em apenas 4 passos, 
            resolvemos seu problema com qualidade e garantia total.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative group"
                variants={stepVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                {/* Connection Line (hidden on mobile) */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-[var(--color-accent)]/30 to-[var(--color-accent)]/10 z-0 origin-left"
                    variants={connectLineVariants}
                  />
                )}

                {/* Step Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[var(--color-accent)]/20 transition-all duration-500 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {step.id}
                  </div>

                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-[var(--color-text)]/70 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full mt-2 flex-shrink-0" />
                          <span className="text-[var(--color-text)]/70">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow for mobile */}
                  {index < processSteps.length - 1 && (
                    <div className="lg:hidden flex justify-center mt-6">
                      <ArrowRight className="h-6 w-6 text-[var(--color-accent)]/50" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-text)]">
              Pronto para começar?
            </h3>
            <p className="text-[var(--color-text)]/70 mb-6">
              Entre em contato agora e tenha seu problema resolvido hoje mesmo!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/40 transition-all duration-300"
                onClick={() => setIsWhatsAppModalOpen(true)}
              >
                <MessageSquare className="h-5 w-5" />
                WhatsApp Agora
              </motion.button>
              
              <motion.a
                href="tel:+5548991130536"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[var(--color-accent)] rounded-xl font-semibold border-2 border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                Ligar Agora
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* WhatsApp Modal */}
      <WhatsAppModal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
      />
    </section>
  );
};

export default HowItWorks;
