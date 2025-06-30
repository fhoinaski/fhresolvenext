import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MessageCircle, Phone, Mail, MapPin, Send, CheckCircle, X, CreditCard, Clock, Star, Users, Zap, Shield } from 'lucide-react';
import WhatsAppModal from './WhatsAppModal';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '', message: '' });
  const [formTouched, setFormTouched] = useState({ name: false, phone: false, message: false });
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        return '';
      case 'phone': 
        if (!value.trim()) return 'Telefone é obrigatório';
        if (!/^\(\d{2}\)\s\d{5}-\d{4}$/.test(value)) return 'Formato: (99) 99999-9999';
        return '';
      case 'message':
        if (!value.trim()) return 'Mensagem é obrigatória';
        if (value.trim().length < 10) return 'Mensagem muito curta';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (formTouched[name as keyof typeof formTouched]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormTouched(prev => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const formatPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      let formattedValue = value;
      if (value.length > 2) formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      if (value.length > 7) formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      setFormData(prev => ({ ...prev, phone: formattedValue }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setFormTouched({ name: true, phone: true, message: true });
    
    const newErrors = {
      name: validateField('name', formData.name),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message)
    };
    setErrors(newErrors);
    
    const hasErrors = Object.values(newErrors).some(error => error);
    if (!hasErrors) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', phone: '', message: '' });
        setErrors({ name: '', phone: '', message: '' });
        setFormTouched({ name: false, phone: false, message: false });
        setSubmitted(false);
      }, 3000);
    }
  };

  const contactInfo = [
    { icon: <Phone className="h-5 w-5 text-[var(--color-accent)]" />, title: 'Telefone', value: '+55 48 99191-9791', link: 'tel:+5548991919791' },
    { icon: <MessageCircle className="h-5 w-5 text-[var(--color-accent)]" />, title: 'WhatsApp', value: 'Alexandre e Fernando', link: '', isWhatsApp: true },
    { icon: <Mail className="h-5 w-5 text-[var(--color-accent)]" />, title: 'Email', value: 'contato@fhresolve.com.br', link: 'mailto:contato@fhresolve.com.br' },
    { icon: <MapPin className="h-5 w-5 text-[var(--color-accent)]" />, title: 'Localização', value: 'Ratones, Florianópolis - SC', link: 'https://maps.google.com/?q=Ratones,Florianópolis,SC' },
  ];

  const stats = [
    { 
      icon: <Users className="h-5 w-5" />, 
      value: '500+', 
      label: 'Clientes Atendidos', 
      color: 'from-green-500 to-green-600' 
    },
    { 
      icon: <Star className="h-5 w-5" />, 
      value: '4.9', 
      label: 'Avaliação Média', 
      color: 'from-yellow-500 to-yellow-600' 
    },
    { 
      icon: <Zap className="h-5 w-5" />, 
      value: '2h', 
      label: 'Tempo de Resposta', 
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      icon: <Shield className="h-5 w-5" />, 
      value: '90d', 
      label: 'Garantia', 
      color: 'from-blue-500 to-blue-600' 
    },
  ];

  const inputClasses = (fieldName: string) => `w-full px-4 py-3 rounded-xl border
    ${
      errors[fieldName as keyof typeof errors] 
        ? 'border-red-500 focus:ring-red-500 bg-red-50/30'
        : formTouched[fieldName as keyof typeof formTouched] && !errors[fieldName as keyof typeof errors]
          ? 'border-green-500 focus:ring-green-500 bg-green-50/30' 
          : 'border-gray-200 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]'
    } 
    focus:outline-none focus:ring-2 bg-white text-[var(--color-text)] transition-all duration-300 placeholder:text-gray-400`;

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-[var(--color-secondary)]/5 to-transparent rounded-full blur-3xl"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-40 left-10 w-2 h-2 bg-[var(--color-accent)]/30 rounded-full animate-pulse"></div>
      <div className="absolute top-60 right-20 w-3 h-3 bg-[var(--color-accent)]/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-[var(--color-accent)]/40 rounded-full animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold mb-4 border border-[var(--color-accent)]/20">
            <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Fale Conosco
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[var(--color-text)] tracking-tight">
            Entre em{' '}
            <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent)] text-transparent bg-clip-text">
              Contato
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text)]/70 max-w-3xl mx-auto leading-relaxed">
            Solicite um orçamento personalizado e descubra como podemos resolver seus problemas residenciais
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="text-center p-4 md:p-6 rounded-xl bg-white shadow-lg border border-gray-100"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-3 shadow-md`}>
                {stat.icon}
              </div>
              <div className="font-bold text-xl md:text-2xl text-[var(--color-text)] mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-[var(--color-text)]/70 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-l from-[var(--color-accent)]/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)] mb-6">
                  Informações de Contato
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    info.isWhatsApp ? (
                      <motion.button
                        key={index}
                        onClick={() => setIsWhatsAppModalOpen(true)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-[var(--color-accent)]/5 border border-gray-100 hover:border-[var(--color-accent)]/20 transition-all duration-300 group w-full text-left"
                      >
                        <div className="p-3 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-shadow duration-300">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                            {info.title}
                          </h4>
                          <p className="text-[var(--color-text)]/70 font-medium">{info.value}</p>
                        </div>
                      </motion.button>
                    ) : (
                      <motion.a
                        key={index}
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-[var(--color-accent)]/5 border border-gray-100 hover:border-[var(--color-accent)]/20 transition-all duration-300 group"
                      >
                        <div className="p-3 rounded-xl bg-white shadow-sm group-hover:shadow-md transition-shadow duration-300">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                            {info.title}
                          </h4>
                          <p className="text-[var(--color-text)]/70 font-medium">{info.value}</p>
                        </div>
                      </motion.a>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 gap-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[var(--color-accent)]/10">
                    <Clock className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text)] mb-2">Resposta Rápida Garantida</h4>
                    <p className="text-[var(--color-text)]/70 text-sm leading-relaxed">
                      Retornamos todos os contatos em até 2 horas durante horário comercial
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-green-100">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--color-text)] mb-2">Horário de Atendimento</h4>
                    <div className="space-y-1 text-sm text-[var(--color-text)]/70">
                      <p className="font-medium">Segunda a Sexta: 8h às 18h</p>
                      <p className="font-medium">Sábado: 8h às 12h</p>
                      <p className="text-xs text-[var(--color-accent)]">Emergências 24h via WhatsApp</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-[var(--color-accent)]/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-[var(--color-text)] mb-6">
                  Envie uma Mensagem
                </h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="relative flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 overflow-hidden"
                  >
                    {/* Confetti effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-400/10"></div>
                    
                    {/* Success icon with animation */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", damping: 15 }}
                      className="relative mb-6"
                    >
                      <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                      <CheckCircle className="h-20 w-20 text-green-500 relative z-10" />
                    </motion.div>
                    
                    <motion.h4
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-bold mb-3 text-green-700"
                    >
                      🎉 Mensagem Enviada com Sucesso!
                    </motion.h4>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-green-600 mb-2 font-medium"
                    >
                      Retornaremos em até <span className="font-bold">2 horas</span>
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="text-green-600/80 text-sm mb-6"
                    >
                      Enquanto isso, que tal falar conosco no WhatsApp?
                    </motion.p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        onClick={() => setIsWhatsAppModalOpen(true)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors shadow-lg flex items-center gap-2"
                      >
                        <MessageCircle size={18} />
                        Falar no WhatsApp
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setSubmitted(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-white border-2 border-green-300 text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-colors"
                      >
                        Enviar Outra Mensagem
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2 text-[var(--color-text)]">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          className={inputClasses('name')}
                          placeholder="Digite seu nome completo"
                          aria-invalid={!!errors.name}
                          aria-describedby="name-error"
                        />
                        {formTouched.name && !errors.name && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                        )}
                      </div>
                      {errors.name && (
                        <p id="name-error" className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <X size={14} /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2 text-[var(--color-text)]">
                        Telefone
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={formatPhone}
                          onBlur={handleBlur}
                          required
                          className={inputClasses('phone')}
                          placeholder="(99) 99999-9999"
                          aria-invalid={!!errors.phone}
                          aria-describedby="phone-error"
                        />
                        {formTouched.phone && !errors.phone && (
                          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
                        )}
                      </div>
                      {errors.phone && (
                        <p id="phone-error" className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <X size={14} /> {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold mb-2 text-[var(--color-text)]">
                        Mensagem
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          rows={4}
                          className={inputClasses('message')}
                          placeholder="Descreva detalhadamente o serviço que você precisa..."
                          aria-invalid={!!errors.message}
                          aria-describedby="message-error"
                        />
                        {formTouched.message && !errors.message && (
                          <CheckCircle className="absolute right-3 top-6 h-5 w-5 text-green-500" />
                        )}
                      </div>
                      {errors.message && (
                        <p id="message-error" className="text-red-500 text-sm mt-2 flex items-center gap-1">
                          <X size={14} /> {errors.message}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-accent)] text-white rounded-xl font-semibold text-lg shadow-lg shadow-[var(--color-accent)]/30 hover:shadow-xl hover:shadow-[var(--color-accent)]/40 transition-all duration-300"
                      >
                        <Send className="h-5 w-5" />
                        Enviar Mensagem
                      </motion.button>
                      <motion.button
                        onClick={() => setIsWhatsAppModalOpen(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-xl font-semibold text-lg shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all duration-300"
                      >
                        <MessageCircle className="h-5 w-5" />
                        WhatsApp
                      </motion.button>
                    </div>
                    
                    <div className="p-4 bg-[var(--color-accent)]/5 rounded-xl border border-[var(--color-accent)]/20">
                      <div className="flex items-start gap-3">
                        <CreditCard className="h-5 w-5 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-[var(--color-text)] mb-1">
                            Facilidade de Pagamento
                          </p>
                          <p className="text-xs text-[var(--color-text)]/70">
                            Aceitamos pagamento em até 12x sem juros no cartão. PIX com desconto especial.
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* WhatsApp Modal */}
      <WhatsAppModal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
      />
    </section>
  );
};

export default Contact;
