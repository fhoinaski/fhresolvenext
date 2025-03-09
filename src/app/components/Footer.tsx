import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, MessageCircle, Phone, Mail, MapPin, ArrowUp, Instagram, Facebook, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const currentYear = new Date().getFullYear();

  const linkVariants = {
    hover: { x: 5, transition: { duration: 0.2 } },
  };

  return (
    <footer className="bg-[var(--color-primary)] text-[var(--color-text)] relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-[var(--color-accent)]/20 via-transparent to-transparent" />
      
      <div className="container py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-[var(--color-accent)]" />
              <h3 className="text-xl font-bold text-white">FH Resolve</h3>
            </div>
            <p className="text-white/70 mb-6 text-sm">
              Serviços profissionais de manutenção residencial em Florianópolis.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Instagram size={18} />, href: '#' },
                { icon: <Facebook size={18} />, href: '#' },
                { icon: <Linkedin size={18} />, href: '#' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:text-white transition-colors border border-white/10"
                  aria-label={`Link para ${social.icon.type.name}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-base font-medium mb-5 text-white">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: 'Início', href: '#hero' },
                { name: 'Sobre', href: '#about' },
                { name: 'Serviços', href: '#benefits' },
                { name: 'Portfólio', href: '#portfolio' },
                { name: 'Contato', href: '#contact' }
              ].map((item) => (
                <motion.li key={item.name} whileHover="hover">
                  <a 
                    href={item.href} 
                    className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <motion.span variants={linkVariants} className="flex items-center">
                      <span className="h-1 w-1 bg-[var(--color-accent)] rounded-full mr-2"></span>
                      {item.name}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-base font-medium mb-5 text-white">Serviços</h3>
            <ul className="space-y-3">
              {[
                'Reparos Elétricos',
                'Serviços Hidráulicos',
                'Montagem de Móveis',
                'Pinturas e Acabamentos',
                'Reparos Gerais'
              ].map((service) => (
                <motion.li key={service} whileHover="hover">
                  <a 
                    href="#benefits" 
                    className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <motion.span variants={linkVariants} className="flex items-center">
                      <span className="h-1 w-1 bg-[var(--color-accent)] rounded-full mr-2"></span>
                      {service}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-base font-medium mb-5 text-white">Contato</h3>
            <ul className="space-y-4">
              {[
                { icon: <Phone size={16} />, value: '+55 48 99191-9791', href: 'tel:+5548991919791' },
                { icon: <MessageCircle size={16} />, value: 'WhatsApp', href: 'https://wa.me/5548991919791' },
                { icon: <Mail size={16} />, value: 'contato@fhresolve.com.br', href: 'mailto:contato@fhresolve.com.br' },
                { icon: <MapPin size={16} />, value: 'Ratones, Florianópolis' },
              ].map((item, index) => (
                <motion.li key={index} whileHover="hover">
                  <a 
                    href={item.href} 
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
                  >
                    <motion.span variants={linkVariants} className="flex items-center gap-3">
                      <span className="text-[var(--color-accent)]">{item.icon}</span>
                      {item.value}
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">© {currentYear} FH Resolve. Todos os direitos reservados.</p>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            className="h-10 w-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shadow-md"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;