'use client';

import { motion } from 'framer-motion';
import { useCurrentYear } from '@/hooks/useCurrentYear';

const Footer: React.FC = () => {
  const currentYear = useCurrentYear();

  return (
    <footer className="py-12 bg-[var(--color-dark)] text-[var(--color-text-light)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/10 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">FH Resolve</h3>
            <p className="text-sm md:text-base opacity-80">
              Sua solução confiável para manutenção residencial em Florianópolis.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Contato</h3>
            <p className="text-sm md:text-base opacity-80">contato@fhresolve.com.br</p>
            <div className="space-y-1">
              <p className="text-sm md:text-base opacity-80">(48) 99113-0536 - Alexandre</p>
              <p className="text-sm md:text-base opacity-80">(48) 99191-9791 - Fernando</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Pronto para Começar?</h3>
            <motion.a
              href="#contact"
              className="inline-block px-6 py-3 rounded-full bg-[var(--color-accent)] text-[var(--color-text-light)] font-semibold hover:bg-[var(--color-accent-dark)] transition-all"
              whileHover={{ scale: 1.1, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
              whileTap={{ scale: 0.95 }}
            >
              Solicite um Orçamento
            </motion.a>
          </motion.div>
        </div>
        <div className="mt-8 text-center text-sm opacity-60">
          © {currentYear} FH Resolve. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;