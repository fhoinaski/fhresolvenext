'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Star, 
  Shield, 
  Clock, 
  Award,
  Heart,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
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
    }
  };

  const services = [
    'Elétrica Residencial',
    'Hidráulica Geral',
    'Instalação de Chuveiros',
    'Reparo de Torneiras',
    'Manutenção Preventiva',
    'Emergências 24h'
  ];

  const quickLinks = [
    { label: 'Sobre Nós', href: '#about' },
    { label: 'Serviços', href: '#benefits' },
    { label: 'Depoimentos', href: '#testimonials' },
    { label: 'Contato', href: '#contact' },
    { label: 'Orçamento', href: '#contact' }
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' }
  ];

  const stats = [
    { icon: <Star size={16} />, value: '500+', label: 'Clientes Atendidos' },
    { icon: <Shield size={16} />, value: '100%', label: 'Satisfação' },
    { icon: <Clock size={16} />, value: '2h', label: 'Tempo Resposta' },
    { icon: <Award size={16} />, value: '5★', label: 'Avaliação Média' }
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)]/95 to-[var(--color-dark)] text-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-[var(--color-secondary)]/5"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-[var(--color-accent)]/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-[var(--color-accent)]/40 rounded-full animate-pulse delay-500"></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <motion.div 
          className="py-8 border-b border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent)]/20 text-[var(--color-accent)] mb-2">
                    {stat.icon}
                  </div>
                  <div className="font-bold text-lg md:text-xl text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div 
          className="py-12 md:py-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Company Info */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-3 text-white">FH Resolve</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    Sua solução confiável para manutenção residencial em Florianópolis. 
                    Qualidade, agilidade e preço justo em todos os nossos serviços.
                  </p>
                  <div className="flex items-center gap-2 text-[var(--color-accent)] text-sm font-medium">
                    <Heart size={16} />
                    <span>Feito com dedicação</span>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-semibold text-white mb-3">Siga-nos</h4>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all duration-300"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Services */}
              <motion.div variants={itemVariants}>
                <h4 className="font-semibold text-white mb-6">Nossos Serviços</h4>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 text-sm group cursor-pointer"
                    >
                      <ChevronRight size={14} className="text-[var(--color-accent)] group-hover:translate-x-1 transition-transform duration-300" />
                      <span>{service}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Quick Links */}
              <motion.div variants={itemVariants}>
                <h4 className="font-semibold text-white mb-6">Links Rápidos</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <motion.li key={index}>
                      <motion.a
                        href={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 text-sm group"
                      >
                        <ChevronRight size={14} className="text-[var(--color-accent)] group-hover:translate-x-1 transition-transform duration-300" />
                        <span>{link.label}</span>
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants}>
                <h4 className="font-semibold text-white mb-6">Entre em Contato</h4>
                <div className="space-y-4">
                  <motion.a
                    href="tel:+5548991919791"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 text-sm group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all duration-300">
                      <Phone size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-white">Telefone</div>
                      <div>(48) 99191-9791</div>
                    </div>
                  </motion.a>

                  <motion.a
                    href="mailto:contato@fhresolve.com.br"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 text-sm group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all duration-300">
                      <Mail size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-white">Email</div>
                      <div>contato@fhresolve.com.br</div>
                    </div>
                  </motion.a>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-white/70 transition-all duration-300 text-sm"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <div className="font-medium text-white">Localização</div>
                      <div>Florianópolis - SC</div>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.div className="mt-6">
                  <motion.a
                    href="https://wa.me/5548991919791"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl font-semibold shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/40 transition-all duration-300"
                  >
                    <MessageCircle size={18} />
                    <span>Solicitar Orçamento</span>
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="py-6 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-white/60 text-sm">
                  © {new Date().getFullYear()} FH Resolve. Todos os direitos reservados.
                </p>
                <p className="text-white/40 text-xs mt-1">
                  CNPJ: 00.000.000/0000-00 • Desenvolvido com ❤️ para seus projetos
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-white/40">
                <a href="#" className="hover:text-white/60 transition-colors">Política de Privacidade</a>
                <span>•</span>
                <a href="#" className="hover:text-white/60 transition-colors">Termos de Uso</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
