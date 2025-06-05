import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Award,
  Users,
  Target,
  Heart,
  Star,
  Zap,
  MessageCircle,
  Phone
} from 'lucide-react';
import Image from 'next/image';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  const stats = [
    { 
      icon: <Award className="h-5 w-5 md:h-6 md:w-6" />, 
      value: '5+', 
      label: 'Anos de Experiência', 
      color: 'from-[var(--color-accent)] to-blue-600' 
    },
    { 
      icon: <Users className="h-5 w-5 md:h-6 md:w-6" />, 
      value: '500+', 
      label: 'Clientes Atendidos', 
      color: 'from-green-500 to-green-600' 
    },
    { 
      icon: <Star className="h-5 w-5 md:h-6 md:w-6" />, 
      value: '4.9', 
      label: 'Avaliação Média', 
      color: 'from-yellow-500 to-yellow-600' 
    },
    { 
      icon: <Zap className="h-5 w-5 md:h-6 md:w-6" />, 
      value: '24h', 
      label: 'Tempo de Resposta', 
      color: 'from-purple-500 to-purple-600' 
    },
  ];

  const benefits = [
    { text: 'Orçamento sem compromisso', icon: <Target className="h-4 w-4" /> },
    { text: 'Materiais de primeira qualidade', icon: <ShieldCheck className="h-4 w-4" /> },
    { text: 'Garantia em todos os serviços', icon: <Award className="h-4 w-4" /> },
    { text: 'Atendimento personalizado', icon: <Heart className="h-4 w-4" /> }
  ];

  const features = [
    { 
      icon: <Clock className="h-6 w-6 md:h-8 md:w-8" />, 
      title: 'Rapidez no Atendimento', 
      desc: 'Resposta em até 2 horas e agendamento no mesmo dia',
      gradient: 'from-[var(--color-accent)]/10 to-blue-600/10',
      iconColor: 'text-[var(--color-accent)]'
    },
    { 
      icon: <MapPin className="h-6 w-6 md:h-8 md:w-8" />, 
      title: 'Cobertura Completa', 
      desc: 'Atendemos toda Florianópolis e região metropolitana',
      gradient: 'from-green-500/10 to-green-600/10',
      iconColor: 'text-green-600'
    },
  ];  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements - responsivos */}
      <div className="absolute top-20 right-0 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-[var(--color-secondary)]/5 to-transparent rounded-full blur-3xl"></div>
      
      {/* Floating Elements - ocultos em mobile */}
      <div className="hidden md:block absolute top-40 left-10 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full"></div>
      <div className="hidden md:block absolute top-60 right-20 w-3 h-3 bg-[var(--color-accent)]/20 rounded-full"></div>
      <div className="hidden md:block absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-[var(--color-accent)]/40 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold mb-4 border border-[var(--color-accent)]/20">
            <ShieldCheck className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Sobre Nós
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[var(--color-text)] tracking-tight">
            Soluções de{' '}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] text-transparent bg-clip-text">
              Confiança
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text)]/70 max-w-3xl mx-auto leading-relaxed px-4">
            Transformamos sua casa em um lar mais seguro e funcional com serviços especializados em manutenção residencial
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-20">
          {/* Content Section */}
          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] leading-tight">
                Experiência e Qualidade que Fazem a Diferença
              </h3>
              
              <div className="space-y-3 md:space-y-4 text-base md:text-lg text-[var(--color-text)]/80 leading-relaxed">
                <p>
                  A <span className="font-semibold text-[var(--color-accent)]">FH Resolve</span> nasceu da paixão por resolver problemas e ajudar pessoas. Com mais de 5 anos de experiência, atendemos residências em toda Florianópolis e região.
                </p>
                <p>
                  Nossa missão é proporcionar tranquilidade e segurança para você e sua família, oferecendo soluções rápidas e eficazes para todos os tipos de reparos e manutenções.
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-4">
              <h4 className="text-lg md:text-xl font-semibold text-[var(--color-text)] mb-3 md:mb-4">
                Por que nos escolher?
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                    className="flex items-center gap-3 p-3 md:p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-shrink-0 p-2 rounded-full bg-[var(--color-accent)]/10">
                      <div className="text-[var(--color-accent)]">{benefit.icon}</div>
                    </div>
                    <span className="text-[var(--color-text)] font-medium text-sm md:text-base">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
              <motion.a
                href="https://wa.me/5548991919791"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-[var(--color-accent)] text-white rounded-xl font-semibold text-base md:text-lg shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/40 transition-all duration-300"
              >
                <MessageCircle size={18} className="md:w-5 md:h-5" />
                <span>Conversar no WhatsApp</span>
              </motion.a>
              
              <motion.a
                href="tel:+5548991919791"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-[var(--color-accent)] text-[var(--color-accent)] rounded-xl font-semibold text-base md:text-lg hover:bg-[var(--color-accent)] hover:text-white transition-all duration-300"
              >
                <Phone size={18} className="md:w-5 md:h-5" />
                <span>Ligar Agora</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-64 md:h-96 lg:h-[500px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent z-10"></div>
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Profissional da FH Resolve realizando serviço de manutenção residencial"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Stats Card - responsivo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-3 -left-3 md:-bottom-6 md:-left-6 bg-white rounded-xl md:rounded-2xl shadow-xl p-3 md:p-6 border border-gray-100"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-[var(--color-accent)]/10 rounded-full mb-2 md:mb-3 mx-auto">
                    <Award className="h-4 w-4 md:h-6 md:w-6 text-[var(--color-accent)]" />
                  </div>
                  <p className="font-bold text-lg md:text-2xl text-[var(--color-text)]">5+</p>
                  <p className="text-xs md:text-sm text-[var(--color-text)]/70 font-medium">Anos de Experiência</p>
                </div>
              </motion.div>

              {/* Rating Card - responsivo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -top-3 -right-3 md:-top-6 md:-right-6 bg-[var(--color-accent)] text-white rounded-xl md:rounded-2xl shadow-xl p-3 md:p-4"
              >
                <div className="flex items-center gap-1 md:gap-2">
                  <Star className="h-4 w-4 md:h-5 md:w-5 fill-current" />
                  <span className="font-bold text-base md:text-lg">4.9</span>
                </div>
                <p className="text-xs opacity-90 mt-1">Avaliação dos clientes</p>
              </motion.div>
            </div>
          </motion.div>
        </div>        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -2, scale: 1.02 }}
              className="text-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-3 md:mb-4 shadow-lg`}>
                {stat.icon}
              </div>
              <div className="font-bold text-xl md:text-3xl text-[var(--color-text)] mb-1 md:mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-[var(--color-text)]/70 font-medium leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -3 }}
              className={`p-6 md:p-8 rounded-xl md:rounded-2xl bg-gradient-to-br ${feature.gradient} border border-gray-100 hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className={`flex-shrink-0 p-2 md:p-3 rounded-lg md:rounded-xl bg-white shadow-md ${feature.iconColor}`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg md:text-xl text-[var(--color-text)] mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-[var(--color-text)]/70 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;