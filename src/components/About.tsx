import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });

  const infoItems = [
    { icon: <Clock className="h-5 w-5" />, title: 'Agilidade', desc: 'Atendimento rápido' },
    { icon: <MapPin className="h-5 w-5" />, title: 'Localidade', desc: 'Florianópolis e região' },
  ];

  const benefits = [
    'Orçamento sem compromisso',
    'Materiais de qualidade',
    'Garantia nos serviços',
    'Atendimento personalizado'
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 bg-[var(--color-gray)] dark:bg-[var(--color-primary)] relative"
    >
      <div className="absolute right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-secondary)]/5 rounded-full blur-3xl translate-y-1/3"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative order-2 md:order-1"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-medium mb-4"
            >
              Quem Somos
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text)] tracking-tight"
            >
              Soluções de Confiança para sua Casa
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg mb-6 text-[var(--color-text)] leading-relaxed"
            >
              <span className="font-medium text-[var(--color-accent)]">FH Resolve</span> oferece serviços
              profissionais de manutenção residencial em Florianópolis. Atendemos
              Ratones, Jurerê e região com segurança e praticidade.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg mb-8 text-[var(--color-text)] leading-relaxed"
            >
              Especializado em resolver problemas do dia a dia com rapidez e eficiência para manter
              sua casa em perfeito estado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-start gap-4 mb-8 p-4 bg-[var(--color-light)] dark:bg-[var(--color-neutral)]/20 rounded-lg"
            >
              <ShieldCheck className="h-10 w-10 text-[var(--color-accent)] flex-shrink-0" />
              <div>
                <h3 className="font-medium text-lg text-[var(--color-text)]">Compromisso com Qualidade</h3>
                <p className="text-[var(--color-text)]/80">
                  Cada serviço é realizado com excelência e garantia de satisfação
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h3 className="font-medium text-lg mb-4 text-[var(--color-text)]">
                Por que nos escolher?
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 size={18} className="text-[var(--color-accent)]" />
                    <span className="text-[var(--color-text)]">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {infoItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-lg bg-[var(--color-card-bg)] shadow-sm border border-[var(--color-neutral)]/30 dark:border-[var(--color-neutral)]/20"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-2 rounded-full bg-[var(--color-accent)]/10 mb-2">
                      <div className="text-[var(--color-accent)]">{item.icon}</div>
                    </div>
                    <h3 className="font-medium text-[var(--color-card-text)]">{item.title}</h3>
                    <p className="text-sm text-[var(--color-card-text)]/80">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative order-1 md:order-2"
          >
            <div className="relative">
              <div className="aspect-video sm:aspect-square rounded-lg overflow-hidden shadow-lg border border-[var(--color-neutral)]/20 dark:border-[var(--color-neutral)]/10">
                <div className="absolute inset-0 bg-[var(--color-accent)]/5 dark:bg-[var(--color-accent)]/10 z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Serviço de manutenção residencial em Florianópolis"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-700"
                  loading="lazy" // Alterado de priority para lazy, pois não é a primeira seção
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-10"
              >
                <div className="relative bg-[var(--color-accent)] text-[var(--color-text-light)] p-3 sm:p-4 rounded-lg shadow-lg">
                  <div className="text-center">
                    <p className="font-bold text-lg sm:text-xl">+15</p>
                    <p className="text-xs sm:text-sm">anos de experiência</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 sm:hidden"
            >
              <a
                href="#contact"
                className="block w-full text-center py-3 px-4 bg-[var(--color-accent)] text-[var(--color-text-light)] rounded-md font-medium hover:bg-[var(--color-accent)]/90 transition-colors shadow-sm"
              >
                Solicitar orçamento
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;