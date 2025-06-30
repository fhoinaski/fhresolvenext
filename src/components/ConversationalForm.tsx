'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  User, 
  Phone, 
  MapPin, 
  Wrench, 
  Clock,
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle,
  Sparkles
} from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  location: string;
  service: string;
  urgency: string;
  description: string;
}

interface Step {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  field: keyof FormData;
  type: 'input' | 'select' | 'textarea';
  placeholder?: string;
  options?: { value: string; label: string; icon?: React.ReactNode }[];
  validation?: (value: string) => string | null;
}

const ConversationalForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    location: '',
    service: '',
    urgency: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  const steps: Step[] = [
    {
      id: 'name',
      title: 'Olá! Como posso te chamar?',
      subtitle: 'Vamos começar com seu nome',
      icon: <User className="h-6 w-6" />,
      field: 'name',
      type: 'input',
      placeholder: 'Digite seu nome...',
      validation: (value) => value.length < 2 ? 'Nome deve ter pelo menos 2 caracteres' : null
    },
    {
      id: 'phone',
      title: `Prazer, ${formData.name}! 📞`,
      subtitle: 'Qual é o melhor número para entrarmos em contato?',
      icon: <Phone className="h-6 w-6" />,
      field: 'phone',
      type: 'input',
      placeholder: '(48) 99999-9999',
      validation: (value) => {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        return !phoneRegex.test(value) ? 'Formato inválido: (48) 99999-9999' : null;
      }
    },
    {
      id: 'location',
      title: 'Onde você está localizado?',
      subtitle: 'Para calcularmos o deslocamento',
      icon: <MapPin className="h-6 w-6" />,
      field: 'location',
      type: 'input',
      placeholder: 'Ex: Centro, Florianópolis',
      validation: (value) => value.length < 3 ? 'Localização deve ter pelo menos 3 caracteres' : null
    },
    {
      id: 'service',
      title: 'Que tipo de serviço você precisa?',
      subtitle: 'Selecione a categoria principal',
      icon: <Wrench className="h-6 w-6" />,
      field: 'service',
      type: 'select',
      options: [
        { value: 'eletrica', label: 'Elétrica', icon: <span className="text-yellow-500">⚡</span> },
        { value: 'hidraulica', label: 'Hidráulica', icon: <span className="text-blue-500">💧</span> },
        { value: 'geral', label: 'Serviços Gerais', icon: <span className="text-green-500">🔧</span> },
        { value: 'emergencia', label: 'Emergência', icon: <span className="text-red-500">🚨</span> }
      ],
      validation: (value) => !value ? 'Selecione um tipo de serviço' : null
    },
    {
      id: 'urgency',
      title: 'Qual a urgência do serviço?',
      subtitle: 'Isso nos ajuda a priorizar seu atendimento',
      icon: <Clock className="h-6 w-6" />,
      field: 'urgency',
      type: 'select',
      options: [
        { value: 'baixa', label: 'Posso aguardar alguns dias', icon: <span className="text-green-500">🟢</span> },
        { value: 'media', label: 'Gostaria de resolver esta semana', icon: <span className="text-yellow-500">🟡</span> },
        { value: 'alta', label: 'É urgente, preciso hoje!', icon: <span className="text-red-500">🔴</span> }
      ],
      validation: (value) => !value ? 'Selecione o nível de urgência' : null
    },
    {
      id: 'description',
      title: 'Conte-me mais detalhes',
      subtitle: 'Descreva o problema ou serviço necessário',
      icon: <MessageCircle className="h-6 w-6" />,
      field: 'description',
      type: 'textarea',
      placeholder: 'Ex: Preciso instalar 3 tomadas no quarto e trocar 2 interruptores na sala...',
      validation: (value) => value.length < 10 ? 'Descreva com mais detalhes (mínimo 10 caracteres)' : null
    }
  ];

  const currentStepData = steps[currentStep];

  // Auto-focus no input quando muda de step
  useEffect(() => {
    if (inputRef.current && !isCompleted) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep, isCompleted]);

  // Formatação automática do telefone
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleInputChange = (value: string) => {
    let formattedValue = value;
    
    if (currentStepData.field === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [currentStepData.field]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[currentStepData.field]) {
      setErrors(prev => ({
        ...prev,
        [currentStepData.field]: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    const value = formData[currentStepData.field];
    const error = currentStepData.validation?.(value);
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [currentStepData.field]: error
      }));
      return false;
    }
    
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: `${formData.name.toLowerCase().replace(/\s+/g, '.')}@conversational.form`,
          message: `Localização: ${formData.location}\nServiço: ${formData.service}\nUrgência: ${formData.urgency}\nDescrição: ${formData.description}`,
          source: 'formulário conversacional'
        }),
      });

      if (response.ok) {
        setIsCompleted(true);
      } else {
        throw new Error('Erro ao enviar formulário');
      }
    } catch (error) {
      console.error('Erro:', error);
      setErrors({ submit: 'Erro ao enviar. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (currentStepData.type !== 'textarea') {
        nextStep();
      }
    }
  };

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-2xl border border-green-100"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Perfeito, {formData.name}! 🎉
          </h3>
          
          <p className="text-gray-600 mb-6">
            Recebemos sua solicitação e entraremos em contato em breve no número {formData.phone}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.a
              href={`https://wa.me/5548999328916?text=Olá! Acabei de preencher o formulário conversacional. Meu nome é ${formData.name} e preciso de ${formData.service}.`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </motion.a>
            
            <motion.button
              onClick={() => {
                setCurrentStep(0);
                setFormData({
                  name: '', phone: '', location: '', service: '', urgency: '', description: ''
                });
                setIsCompleted(false);
                setErrors({});
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Novo Orçamento
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Etapa {currentStep + 1} de {steps.length}</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-[var(--color-accent)] to-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Main Form Card */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
      >
        {/* Step Icon & Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-[var(--color-accent)]">
              {currentStepData.icon}
            </span>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentStepData.title}
          </h2>
          
          <p className="text-gray-600">
            {currentStepData.subtitle}
          </p>
        </div>

        {/* Form Input */}
        <div className="mb-8">
          {currentStepData.type === 'input' && (
            <motion.input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={formData[currentStepData.field]}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentStepData.placeholder}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] transition-all"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            />
          )}

          {currentStepData.type === 'textarea' && (
            <motion.textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={formData[currentStepData.field]}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentStepData.placeholder}
              rows={4}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 focus:border-[var(--color-accent)] transition-all resize-none"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            />
          )}

          {currentStepData.type === 'select' && (
            <div className="space-y-3">
              {currentStepData.options?.map((option, index) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleInputChange(option.value)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`w-full p-4 text-left rounded-2xl border-2 transition-all ${
                    formData[currentStepData.field] === option.value
                      ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {option.icon}
                    <span className="text-lg font-medium">{option.label}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Error Message */}
          <AnimatePresence>
            {errors[currentStepData.field] && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-sm mt-3 flex items-center gap-2"
              >
                <span className="text-red-500">⚠️</span>
                {errors[currentStepData.field]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentStep > 0 && (
            <motion.button
              onClick={prevStep}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Voltar
            </motion.button>
          )}

          <motion.button
            onClick={nextStep}
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-accent)] to-blue-600 text-white rounded-full font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Enviando...
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                <Send className="h-5 w-5" />
                Enviar Orçamento
              </>
            ) : (
              <>
                Continuar
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConversationalForm;
