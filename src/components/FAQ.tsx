'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, CreditCard, Clock, Phone, CheckCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [openItems, setOpenItems] = useState<number[]>([0]); // Primeiro item aberto por padrão

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData: FAQItem[] = [
    {
      icon: <Shield className="h-5 w-5" />,
      question: "Vocês oferecem garantia nos serviços?",
      answer: "Sim! Oferecemos garantia em todos os nossos serviços. Para serviços elétricos e hidráulicos, a garantia é de 90 dias. Para materiais, seguimos a garantia do fabricante. Nossa garantia cobre defeitos no serviço executado e inclui revisão gratuita se necessário."
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      question: "Quais formas de pagamento são aceitas?",
      answer: "Aceitamos diversas formas de pagamento: cartão de crédito (até 12x sem juros), cartão de débito, PIX, transferência bancária e dinheiro. Para pagamento à vista oferecemos desconto especial. O pagamento pode ser feito na conclusão do serviço."
    },
    {
      icon: <Clock className="h-5 w-5" />,
      question: "Qual o horário de atendimento para emergências?",
      answer: "Nosso atendimento regular é de segunda a sábado, das 7h às 19h. Para emergências (vazamentos, problemas elétricos graves, etc.), oferecemos atendimento 24 horas com taxa adicional. Entre em contato pelo WhatsApp para emergências."
    },
    {
      icon: <Phone className="h-5 w-5" />,
      question: "A visita para orçamento tem custo?",
      answer: "A visita para orçamento é GRATUITA em toda região de Florianópolis. Nossos especialistas fazem uma avaliação completa e apresentam um orçamento detalhado sem compromisso. Só cobramos se você aprovar e executarmos o serviço."
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      question: "Vocês atendem em que regiões?",
      answer: "Atendemos toda Florianópolis e região metropolitana, incluindo: Centro, Norte da Ilha (Ratones, Jurerê, Daniela), Sul da Ilha (Campeche, Ribeirão da Ilha), Continente (Barreiros, Coqueiros) e São José. Para outras localidades, consulte a disponibilidade."
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
    hidden: { opacity: 0, y: 20 },
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
      id="faq"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-[var(--color-accent)]/5 to-transparent rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header da seção */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold mb-4 border border-[var(--color-accent)]/20">
            <CheckCircle className="h-4 w-4 mr-2" />
            Perguntas Frequentes
          </span>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text)]">
            Tire suas{' '}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] text-transparent bg-clip-text">
              Dúvidas
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-[var(--color-text)]/70 max-w-3xl mx-auto">
            Aqui estão as respostas para as perguntas mais comuns sobre nossos serviços
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-4"
            >
              <motion.div
                className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                  openItems.includes(index)
                    ? 'border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5'
                    : 'border-gray-200 bg-white hover:border-[var(--color-accent)]/20'
                }`}
                whileHover={{ y: -2 }}
              >
                <motion.button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between group"
                  whileTap={{ scale: 0.995 }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors duration-300 ${
                      openItems.includes(index)
                        ? 'bg-[var(--color-accent)] text-white'
                        : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                    }`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                      {item.question}
                    </h3>
                  </div>
                  
                  <motion.div
                    animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`transition-colors duration-300 ${
                      openItems.includes(index)
                        ? 'text-[var(--color-accent)]'
                        : 'text-gray-400 group-hover:text-[var(--color-accent)]'
                    }`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openItems.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-[88px]">
                        <p className="text-[var(--color-text)]/80 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Final */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-[var(--color-text)]/70 mb-6">
            Não encontrou sua dúvida? Fale conosco diretamente!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+5548991130536"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Phone className="h-5 w-5" />
              Ligar Agora
            </motion.a>
            
            <motion.a
              href="mailto:contato@fhresolve.com.br"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-6 py-3 border-2 border-[var(--color-accent)] text-[var(--color-accent)] rounded-xl font-semibold hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
            >
              <CheckCircle className="h-5 w-5" />
              Enviar Email
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
