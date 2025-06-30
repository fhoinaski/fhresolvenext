'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, User, Phone } from 'lucide-react';

interface WhatsAppContact {
  name: string;
  phone: string;
  role: string;
  speciality: string;
}

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const contacts: WhatsAppContact[] = [
    {
      name: 'Alexandre',
      phone: '48991130536',
      role: 'Especialista Técnico',
      speciality: 'Hidráulica, Elétrica e Serviços Gerais'
    },
    {
      name: 'Fernando',
      phone: '48991919791',
      role: 'Especialista Técnico',
      speciality: 'Hidráulica, Elétrica e Serviços Gerais'
    }
  ];

  const handleContactClick = (phone: string, name: string) => {
    const message = `Olá ${name}! Gostaria de solicitar um orçamento para serviços de manutenção residencial.`;
    const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const formatPhone = (phone: string) => {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Escolha seu Especialista</h3>
                    <p className="text-green-100 text-sm">Fale direto no WhatsApp</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-[var(--color-text)]/70 text-sm mb-6 text-center">
                Nossos especialistas estão prontos para atender você com excelência
              </p>

              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <motion.button
                    key={contact.name}
                    onClick={() => handleContactClick(contact.phone, contact.name)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-left group relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative flex items-center gap-4">
                      {/* Avatar com gradiente personalizado */}
                      <div className={`w-14 h-14 bg-gradient-to-br ${
                        index === 0 
                          ? 'from-blue-500 to-blue-600' 
                          : 'from-green-500 to-green-600'
                      } rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform shadow-lg`}>
                        {contact.name.charAt(0)}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-[var(--color-text)] text-lg">
                            {contact.name}
                          </h4>
                          <div className="flex items-center gap-1 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium">Disponível</span>
                          </div>
                        </div>
                        <p className="text-[var(--color-accent)] font-semibold text-sm mb-1">
                          {contact.role}
                        </p>
                        <p className="text-[var(--color-text)]/70 text-xs mb-2 font-medium">
                          ⚡ {contact.speciality}
                        </p>
                        <div className="flex items-center gap-2 text-[var(--color-text)]/70">
                          <Phone className="h-3 w-3" />
                          <span className="text-xs font-mono">
                            {formatPhone(contact.phone)}
                          </span>
                        </div>
                        
                        {/* Badge de experiência */}
                        <div className="mt-2 flex gap-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                            5+ anos
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                            Garantia
                          </span>
                        </div>
                      </div>

                      {/* WhatsApp Icon com animação */}
                      <div className="text-green-500 group-hover:text-green-600 transition-colors">
                        <div className="relative">
                          <MessageCircle className="h-7 w-7" />
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Call to Action melhorado */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="text-center">
                  <p className="text-sm font-semibold text-[var(--color-text)] mb-2">
                    � Atendimento Rápido e Profissional
                  </p>
                  <p className="text-xs text-[var(--color-text)]/70 mb-3">
                    🕐 Horário: 7h às 19h | 📞 Emergências: 24h | ⚡ Resposta em minutos
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Orçamento Gratuito</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Garantia Inclusa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppModal;
